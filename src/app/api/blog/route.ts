import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { insertBlogPostSchema } from '@/lib/schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const posts = await storage.getAllBlogPosts(tag || undefined);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertBlogPostSchema.parse(body);
    const post = await storage.createBlogPost(validatedData);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid blog post data" },
      { status: 400 }
    );
  }
}