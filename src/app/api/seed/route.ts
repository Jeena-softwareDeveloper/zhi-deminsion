import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import { Category } from '@/lib/models/Category';
import { Enquiry } from '@/lib/models/Enquiry';
import { Quotation } from '@/lib/models/Quotation';
import { initialCategories, initialProducts, initialEnquiries, initialQuotations } from '@/lib/data/initialData';

export async function POST() {
  try {
    await connectDB();

    // Clear and re-populate or update existing
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Enquiry.deleteMany({});
    await Quotation.deleteMany({});

    await Category.insertMany(initialCategories);
    await Product.insertMany(initialProducts);
    await Enquiry.insertMany(initialEnquiries);
    await Quotation.insertMany(initialQuotations);

    return NextResponse.json({
      success: true,
      message: 'MongoDB database initialized with ZHI DIMENSION initial data',
      counts: {
        categories: initialCategories.length,
        products: initialProducts.length,
        enquiries: initialEnquiries.length,
        quotations: initialQuotations.length,
      },
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}

