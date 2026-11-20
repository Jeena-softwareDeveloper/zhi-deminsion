# ZHI DIMENSION - Web Application & Admin Panel

> **Engineering Strength. Building Possibilities.**  
> Complete web application and admin panel built with **Next.js (App Router)**, **Tailwind CSS**, and **MongoDB (Mongoose)**, faithfully reproducing the **ZHI DIMENSION** product catalogue, fabrication services, agricultural machinery, customer quotation workflow, and administrative operations system.

---

## 🌟 Document & Slide Implementation Mapping

| Slide | Section in Document | Implementation Path | Features & Highlights |
|---|---|---|---|
| **Page 1** | **Brand Introduction** | `src/components/ZhiLogo.tsx` | Official ZHI DIMENSION branding with custom typography, orange accent slash, taglines, and 3 pillar icons. |
| **Page 2** | **Website Homepage** | `src/app/page.tsx` | Industrial steel hero banner, headline, "Explore Products" & "Contact Us" CTAs, and the **4 Value Proposition Cards** (*Quality Materials, Custom Fabrication, On-Time Delivery, Customer Support*). |
| **Page 3** | **Product Catalogue** | `src/app/products/page.tsx` | "Our Products" catalogue with category filter pills (*All, Steel Products, Welding & Fabrication, Agricultural Equipment*), search bar, and dual-action cards (*View Details, Request a Quote*). |
| **Page 4** | **Welding & Fabrication Services** | `src/app/services/page.tsx` | Grid of the 7 core metal fabrication solutions (*Custom Fabrication, Gate & Grill Works, Metal Cutting, Industrial Structures, Welding Services, Repair & Maintenance, Design & Build*). |
| **Page 5** | **Agricultural Equipment** | `src/app/agricultural-equipment/page.tsx` | Tractor hero banner with headline *"Better tools for better harvests"*, and the 4 featured implements (*Rotavator, Plough, Seed Drill, Sprayer*). |
| **Page 6** | **Customer Enquiry Workflow** | `src/app/products/[slug]/page.tsx` | Breadcrumbs (`Home > Steel Products > Steel Pipes`), image gallery, specs table, direct **WhatsApp** trigger, and interactive **Request a Quote** form saving to MongoDB. |
| **Page 7** | **Admin Dashboard** | `src/app/admin/page.tsx` | Dark Navy sidebar navigation, 4 KPI cards (*Total Products: 124, Total Enquiries: 48, Pending Quotations: 12, Low Stock: 5*), **Recent Enquiries** interactive table, and **Recent Products** stock status widget. |
| **Page 8** | **Mobile Responsive Design** | `src/components/MobileBottomNav.tsx` | Fully responsive layouts across smartphone screens, hamburger navigation, and dedicated mobile bottom navigation bar (*Home, Products, Enquiry, More*). |
| **Page 9** | **Final Brand Presentation** | `src/app/page.tsx` | Showcase presentation banner with brand slogan: *"Quality Materials. Reliable Fabrication. Smarter Agricultural Solutions."* |

---

## 🗄️ MongoDB Architecture

The project connects to MongoDB via Mongoose at `mongodb://127.0.0.1:27017/zhi_dimension` (configurable via `.env.local`).

### Collections:
1. **`products`**:
   - `name`, `slug`, `category`, `shortDescription`, `description`, `images`, `specifications`, `stockStatus` (*In Stock*, *Low Stock*, *Out of Stock*), `stockQuantity`, `priceEstimate`.
2. **`enquiries`**:
   - `customerName`, `phone`, `email`, `productRequired`, `quantitySize`, `message`, `status` (*Pending*, *Quoted*, *In Progress*, *Contacted*, *Closed*), `notes`.
3. **`quotations`**:
   - `quoteNumber`, `customerName`, `phone`, `email`, `items` (*description, quantity, unitRate, total*), `subtotal`, `tax` (18% GST), `grandTotal`, `status`.
4. **`categories`**:
   - `name`, `slug`, `description`, `image`, `itemCount`.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested with v24.16.0)
- **MongoDB** running locally on port `27017` or a MongoDB Atlas URI

### 2. Environment Variables
Create or verify `.env.local`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/zhi_dimension
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_PASSWORD=admin123
```

### 3. Seed Database
Pre-populate the database with the exact products, categories, enquiries, and quotations from the presentation:
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Production Build & Start
```bash
npm run build
npm run start
```

---

## 📋 Route Sitemap

### Public Pages:
- **Homepage**: `http://localhost:3000/`
- **Product Catalogue**: `http://localhost:3000/products`
- **Product Detail & Quote Form**: `http://localhost:3000/products/steel-pipes`
- **Fabrication & Welding Services**: `http://localhost:3000/services`
- **Agricultural Equipment**: `http://localhost:3000/agricultural-equipment`
- **About Us**: `http://localhost:3000/about`
- **Contact Us**: `http://localhost:3000/contact`

### Admin Panel:
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Products Management (CRUD)**: `http://localhost:3000/admin/products`
- **Enquiries / Lead Pipeline**: `http://localhost:3000/admin/enquiries`
- **Quotations Generator & Print Sheets**: `http://localhost:3000/admin/quotations`
- **Inventory & Stock Thresholds**: `http://localhost:3000/admin/inventory`
- **Categories Manager**: `http://localhost:3000/admin/categories`
- **Platform & WhatsApp Settings**: `http://localhost:3000/admin/settings`
- **User Roles & Staff Access**: `http://localhost:3000/admin/users`

