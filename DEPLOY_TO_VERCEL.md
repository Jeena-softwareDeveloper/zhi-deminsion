# Vercel Deployment Guide - ZHI DIMENSION

This Next.js 14 application is fully production-ready for deployment on **Vercel**.

---

## ⚠️ Important Prerequisite: Cloud MongoDB (MongoDB Atlas)

Since local `mongodb://127.0.0.1:27017` only runs on your local machine, Vercel requires a cloud-accessible MongoDB URI.

### Step 1: Create a Free MongoDB Atlas Database (Free Forever - 512 MB)
1. Go to **[mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)** and sign up / log in.
2. Click **Create Deployment** -> Select **M0 Free Tier** (AWS, Mumbai or nearest region).
3. Under **Database Access**:
   - Create a database user (e.g., `zhi_admin` with a password).
4. Under **Network Access**:
   - Click **Add IP Address** -> Select **Allow Access from Anywhere (`0.0.0.0/0`)** -> Save.
5. Under **Database** -> Click **Connect** -> Choose **Drivers (Node.js)**:
   - Copy your connection string:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/zhi_dimension?retryWrites=true&w=majority
     ```

---

## 🚀 Deployment Method 1: Via GitHub (Recommended)

### 1. Push code to your GitHub
```bash
git remote add origin https://github.com/<your-username>/zhi-dimension.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel
1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
2. Click **"Add New Project"** -> Import `zhi-dimension`.
3. In **Environment Variables**, add:
   - `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/zhi_dimension?retryWrites=true&w=majority`
   - `ADMIN_PASSWORD` = `admin123`
   - `NEXT_PUBLIC_APP_URL` = `https://your-project.vercel.app`
4. Click **Deploy**!

---

## 💻 Deployment Method 2: Via Vercel CLI

Run directly in terminal:
```bash
npx vercel
```
1. Follow the terminal prompts to log in.
2. Select your Vercel account.
3. Link to project and deploy.
4. Set environment variables on Vercel dashboard:
   - Go to Project Settings -> **Environment Variables** -> Add `MONGODB_URI`.
5. Run production deployment:
   ```bash
   npx vercel --prod
   ```

---

## ⚡ Auto-Seeding MongoDB on Vercel
Once deployed to Vercel, simply visit:
```text
https://your-project.vercel.app/api/seed
```
This automatically seeds the 124 products, enquiries, categories, and initial quotations into your MongoDB Atlas cloud database in 1 second!

