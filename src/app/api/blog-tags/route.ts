import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET() {
  try {
    const tags = await storage.getAllBlogTags();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog tags" },
      { status: 500 }
    );
  }
}