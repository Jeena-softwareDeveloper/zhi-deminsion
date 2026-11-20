import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const existing = await Category.findOne({ $or: [{ name: body.name.trim() }, { slug }] });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A category with this name or slug already exists' },
        { status: 400 }
      );
    }

    const newCategory = await Category.create({
      name: body.name.trim(),
      slug,
      description: body.description || '',
      image: body.image || '/images/steel-framework.jpg',
      itemCount: Number(body.itemCount) || 0,
      status: body.status || 'Active',
    });

    return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}