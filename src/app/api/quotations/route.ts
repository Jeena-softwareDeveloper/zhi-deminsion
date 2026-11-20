import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Quotation } from '@/lib/models/Quotation';
import { Enquiry } from '@/lib/models/Enquiry';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const quotations = await Quotation.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: quotations.length, quotations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Auto-generate quote number if not provided
    if (!body.quoteNumber) {
      const count = await Quotation.countDocuments();
      const year = new Date().getFullYear();
      body.quoteNumber = `QT-${year}-${String(count + 1).padStart(3, '0')}`;
    }

    // Calculate subtotal, tax, grandTotal if needed
    if (body.items && Array.isArray(body.items)) {
      body.subtotal = body.items.reduce((sum: number, it: any) => sum + (Number(it.total) || (Number(it.quantity) * Number(it.unitRate)) || 0), 0);
      body.tax = Math.round(body.subtotal * 0.18); // standard 18% GST
      body.grandTotal = body.subtotal + body.tax;
    }

    const quotation = await Quotation.create(body);

    // If linked to enquiry, update enquiry status to "Quoted"
    if (body.enquiryId) {
      await Enquiry.findByIdAndUpdate(body.enquiryId, { status: 'Quoted' });
    }

    return NextResponse.json({ success: true, quotation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

