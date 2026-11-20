import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Enquiry } from '@/lib/models/Enquiry';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const enquiry = await Enquiry.findById(params.id);
    if (!enquiry) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, enquiry });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await Enquiry.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deleted = await Enquiry.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

