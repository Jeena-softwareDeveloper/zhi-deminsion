/**
 * Upload an image file from Admin forms to /api/upload and return its public URL.
 */
export async function uploadAdminImage(file: File): Promise<{ url?: string; error?: string }> {
  try {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.success && data.url) {
      return { url: data.url };
    }
    return { error: data.error || 'Image upload failed' };
  } catch {
    return { error: 'Image upload failed' };
  }
}
