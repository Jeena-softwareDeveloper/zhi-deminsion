import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns';
import mongoose from 'mongoose';

function loadMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const line = fs
      .readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .find((entry) => entry.startsWith('MONGODB_URI='));
    if (line) return line.slice('MONGODB_URI='.length).trim();
  }
  return 'mongodb://127.0.0.1:27017/zhi_dimension';
}

const MONGODB_URI = loadMongoUri();

if (MONGODB_URI.startsWith('mongodb+srv://')) {
  const isLoopbackOnly = (servers) =>
    servers.length === 0 || servers.every((ip) => ip === '127.0.0.1' || ip === '::1');

  if (isLoopbackOnly(dns.getServers())) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }
  if (isLoopbackOnly(dns.promises.getServers())) {
    dns.promises.setServers(['8.8.8.8', '1.1.1.1']);
  }
}

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    itemCount: { type: Number, default: 0 },
    status: { type: String, default: 'Active' },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
    },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    specifications: { type: Map, of: String, default: {} },
    stockStatus: { type: String, default: 'In Stock' },
    stockQuantity: { type: Number, default: 10 },
    isFeatured: { type: Boolean, default: false },
    priceEstimate: { type: String, default: '' },
  },
  { timestamps: true }
);

const EnquirySchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    productRequired: { type: String, required: true },
    quantitySize: { type: String, default: '' },
    message: { type: String, default: '' },
    status: { type: String, default: 'Pending' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const QuotationItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitRate: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});

const QuotationSchema = new mongoose.Schema(
  {
    quoteNumber: { type: String, required: true, unique: true },
    enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry' },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    items: [QuotationItemSchema],
    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    grandTotal: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'Draft' },
    validUntil: { type: Date },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
const Quotation = mongoose.models.Quotation || mongoose.model('Quotation', QuotationSchema);

const categories = [
  {
    name: 'Agriculture',
    slug: 'agriculture',
    description:
      'Products developed for farmers, agricultural operations and everyday field productivity.',
    image: '/images/cat-agriculture.jpg',
    itemCount: 0,
    status: 'Active',
  },
  {
    name: 'Home & Residential',
    slug: 'home-residential',
    description:
      'Products manufactured for practical everyday household and residential applications.',
    image: '/images/cat-home.jpg',
    itemCount: 0,
    status: 'Active',
  },
  {
    name: 'Industrial',
    slug: 'industrial',
    description:
      'Products developed for dependable commercial and industrial operations.',
    image: '/images/cat-industrial.jpg',
    itemCount: 0,
    status: 'Active',
  },
];

async function seed() {
  try {
    const safeUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
    console.log('Connecting to MongoDB at:', safeUri);
    await mongoose.connect(MONGODB_URI);

    await Category.deleteMany({});
    await Product.deleteMany({});
    await Enquiry.deleteMany({});
    await Quotation.deleteMany({});

    await Category.insertMany(categories);

    console.log('Seed completed with approved categories only.');
    console.log(`- Categories: ${categories.length}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
