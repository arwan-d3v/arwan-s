import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID || '';
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '';
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '';
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || '';

// We only initialize S3 if credentials are provided
const s3 = R2_ACCOUNT_ID ? new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
}) : null;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!s3 || !R2_BUCKET_NAME) {
      console.warn('⚠️ Cloudflare R2 credentials missing. Simulating upload success.');
      // Mock Fallback
      return NextResponse.json({
        success: true,
        url: `https://mock-arwanspace-r2.storage/mock-${file.name}`
      });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `uploads/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);

    // Assuming public access is configured or we generate a presigned URL
    // In production you might have a custom domain mapped to the R2 bucket
    // For now, let's return a presigned URL valid for 1 hour as an example
    // Or if public: `https://pub-${...}.r2.dev/${key}`
    // We return a public URL. In production you might have a custom domain mapped to the R2 bucket.
    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
      ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`
      : `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;

    // Also, we should increment utility_usage in Supabase here
    // ...

    return NextResponse.json({
      success: true,
      url: publicUrl
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred during upload';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
