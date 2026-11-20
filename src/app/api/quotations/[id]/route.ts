import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Quotation } from '@/lib/models/Quotation';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const quotation = await Quotation.findById(params.id);
    if (!quotation) {
      return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, quotation });
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
    const updated = await Quotation.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, quotation: updated });
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
    const deleted = await Quotation.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Quotation deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

