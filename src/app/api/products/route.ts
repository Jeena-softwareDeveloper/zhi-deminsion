import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import { initialProducts } from '@/lib/data/initialData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');
  const limit = parseInt(searchParams.get('limit') || '100');

  try {
    await connectDB();

    const query: any = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).limit(limit);
    return NextResponse.json({ success: true, count: products.length, products });
  } catch {
    const filtered = initialProducts.filter((p) => {
      if (category && category !== 'All' && p.category !== category) return false;
      if (featured === 'true' && !p.isFeatured) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${p.name} ${p.shortDescription || ''} ${p.description || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return NextResponse.json({
      success: true,
      count: filtered.length,
      products: filtered.slice(0, limit),
      fallback: true,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Auto-generate slug if not provided
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

