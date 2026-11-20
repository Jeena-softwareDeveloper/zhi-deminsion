import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Enquiry } from '@/lib/models/Enquiry';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');

    const query: any = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 }).limit(limit);
    return NextResponse.json({ success: true, count: enquiries.length, enquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.customerName || !body.phone || !body.productRequired) {
      return NextResponse.json(
        { success: false, error: 'Name, Phone, and Product Requirement are required.' },
        { status: 400 }
      );
    }

    const newEnquiry = await Enquiry.create({
      customerName: body.customerName,
      phone: body.phone,
      email: body.email || '',
      productRequired: body.productRequired,
      quantitySize: body.quantitySize || '',
      message: body.message || '',
      status: 'Pending',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully! Our representative will contact you shortly.',
        enquiry: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

