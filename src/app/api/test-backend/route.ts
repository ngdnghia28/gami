
import { NextRequest, NextResponse } from "next/server";
import { apiClient } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing backend connection...');
    
    // Test health check endpoint
    const healthCheck = await apiClient.healthCheck();
    console.log('Health check result:', healthCheck);

    return NextResponse.json({
      success: true,
      message: "Backend connection successful",
      healthCheck,
      backendUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adl-cms-735256194233.asia-southeast1.run.app'
    });

  } catch (error) {
    console.error("Backend test error:", error);
    
    return NextResponse.json({
      success: false,
      message: "Backend connection failed",
      error: error instanceof Error ? error.message : 'Unknown error',
      backendUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adl-cms-735256194233.asia-southeast1.run.app'
    }, { status: 500 });
  }
}
