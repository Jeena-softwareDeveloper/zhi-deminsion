import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/lib/models/Category';
import { initialCategories } from '@/lib/data/initialData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('activeOnly') === 'true';

  try {
    await connectDB();
    const filter = activeOnly ? { status: { $ne: 'Inactive' } } : {};
    const categories = await Category.find(filter).sort({ createdAt: 1 });

    // If MongoDB is fresh/empty and public homepage requests active categories, return approved defaults
    if (categories.length === 0 && activeOnly) {
      return NextResponse.json({
        success: true,
        count: initialCategories.length,
        categories: initialCategories,
        fallback: true,
      });
    }

    return NextResponse.json({ success: true, count: categories.length, categories });
  } catch {
    const list = activeOnly
      ? initialCategories.filter((c) => c.status !== 'Inactive')
      : initialCategories;
    return NextResponse.json({
      success: true,
      count: list.length,
      categories: list,
      fallback: true,
    });
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
      image: body.image || '/images/logo.png',
      itemCount: Number(body.itemCount) || 0,
      status: body.status || 'Active',
    });

    return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
