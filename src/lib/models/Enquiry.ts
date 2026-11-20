import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  customerName: string;
  phone: string;
  email?: string;
  productRequired: string;
  quantitySize?: string;
  message?: string;
  status: 'Pending' | 'Quoted' | 'In Progress' | 'Contacted' | 'Closed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    productRequired: { type: String, required: true },
    quantitySize: { type: String, default: '' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Quoted', 'In Progress', 'Contacted', 'Closed'],
      default: 'Pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

