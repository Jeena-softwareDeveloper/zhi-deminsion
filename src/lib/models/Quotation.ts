import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuotationItem {
  description: string;
  quantity: number;
  unitRate: number;
  total: number;
}

export interface IQuotation extends Document {
  quoteNumber: string;
  enquiryId?: mongoose.Types.ObjectId;
  customerName: string;
  phone: string;
  email?: string;
  items: IQuotationItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Pending';
  validUntil: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuotationItemSchema = new Schema<IQuotationItem>({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitRate: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});

const QuotationSchema = new Schema<IQuotation>(
  {
    quoteNumber: { type: String, required: true, unique: true },
    enquiryId: { type: Schema.Types.ObjectId, ref: 'Enquiry' },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    items: { type: [QuotationItemSchema], default: [] },
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Draft', 'Sent', 'Approved', 'Pending'],
      default: 'Pending',
    },
    validUntil: { type: Date, default: () => new Date(Date.now() + 15 * 86400000) },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Quotation: Model<IQuotation> =
  mongoose.models.Quotation || mongoose.model<IQuotation>('Quotation', QuotationSchema);

