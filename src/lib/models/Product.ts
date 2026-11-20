import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: 'Steel Products' | 'Welding & Fabrication' | 'Agricultural Equipment';
  shortDescription: string;
  description: string;
  images: string[];
  specifications: Record<string, string>;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stockQuantity: number;
  isFeatured: boolean;
  priceEstimate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ['Steel Products', 'Welding & Fabrication', 'Agricultural Equipment'],
    },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    specifications: { type: Map, of: String, default: {} },
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
    stockQuantity: { type: Number, default: 10 },
    isFeatured: { type: Boolean, default: false },
    priceEstimate: { type: String, default: 'On Request' },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

