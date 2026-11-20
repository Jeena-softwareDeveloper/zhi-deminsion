import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/lib/models/Category';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, count: categories.length, categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 
