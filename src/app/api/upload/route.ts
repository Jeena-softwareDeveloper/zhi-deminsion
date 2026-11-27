import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import crypto from 'node:crypto';
import path from 'path';

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

function getCloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (cloudName && apiKey && apiSecret) {
    return { cloudName, apiKey, apiSecret };
  }

  const rawUrl = process.env.CLOUDINARY_URL?.trim();
  if (rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      if (parsed.hostname && parsed.username && parsed.password) {
        return {
          cloudName: parsed.hostname,
          apiKey: decodeURIComponent(parsed.username),
          apiSecret: decodeURIComponent(parsed.password),
        };
      }
    } catch {
      return null;
    }
  }

  return null;
}

async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  mimeType: string,
  config: CloudinaryConfig
) {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'zhi-dimension';
  const stringToSign = `folder=${folder}&timestamp=${timestamp}${config.apiSecret}`;
  const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

  const fd = new FormData();
  fd.append('file', new Blob([new Uint8Array(buffer)], { type: mimeType || 'application/octet-stream' }), filename);
  fd.append('api_key', config.apiKey);
  fd.append('timestamp', String(timestamp));
  fd.append('folder', folder);
  fd.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
    method: 'POST',
    body: fd,
  });
  const data = await res.json();

  if (!res.ok || !data?.secure_url) {
    throw new Error(data?.error?.message || 'Cloudinary upload failed');
  }

  return {
    url: data.secure_url as string,
    publicId: data.public_id as string,
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase() || MIME_TO_EXT[file.type] || '';
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { success: false, error: 'Only JPG, PNG, WEBP, and GIF images are allowed' },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { success: false, error: 'Image size must be 10 MB or less' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinary = getCloudinaryConfig();
    if (cloudinary) {
      const uploaded = await uploadToCloudinary(
        buffer,
        file.name || `upload${ext}`,
        file.type || 'image/png',
        cloudinary
      );
      return NextResponse.json({
        success: true,
        url: uploaded.url,
        publicId: uploaded.publicId,
        provider: 'cloudinary',
      });
    }

    const safeBase =
      path
        .basename(file.name, ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .slice(0, 40) || 'image';

    const filename = `${Date.now()}-${safeBase}${ext}`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, filename), buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      provider: 'local',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
