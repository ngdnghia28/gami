import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await storage.getBlogPost(id);
    if (!post) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}