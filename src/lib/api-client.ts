import { z } from 'zod';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adl-cms-735256194233.asia-southeast1.run.app';

// Type definitions based on the API documentation
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  readTime: number;
  isPublished: boolean;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  focusKeyword?: string;
  ogImage?: string;
  ogDescription?: string;
  canonicalUrl?: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Festival {
  id: string;
  name: string;
  description: string;
  lunarDate: string;
  solarDate?: string;
  category: string;
  region?: string;
  isNationalHoliday: boolean;
}

export interface LunarDate {
  id: string;
  solarDate: string;
  lunarDate: string;
  canChi: string;
  zodiac: string;
  lunarMonth: number;
  lunarDay: number;
  lunarYear: number;
}

export interface AstrologyReading {
  id: string;
  userId?: number;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
  reading: string;
  lunarBirthDate: string;
  canChi: string;
  zodiac: string;
  createdAt: Date;
}

// Enhanced API response type that includes both data and Response object
export interface ApiResponse<T> {
  data: T;
  response: Response;
  status: number;
  headers: Headers;
}

// API error type with structured error information
export interface ApiError {
  status: number;
  message: string;
  details?: any;
  response?: Response;
}

// API Client class
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    returnFullResponse: boolean = false
  ): Promise<T | ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      credentials: 'include', // Include cookies for cross-origin requests
      mode: 'cors', // Explicitly set CORS mode
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      let data: T;
      try {
        data = await response.json();
      } catch (jsonError) {
        // Handle non-JSON responses
        data = (await response.text()) as unknown as T;
      }

      if (!response.ok) {
        const apiError: ApiError = {
          status: response.status,
          message: typeof data === 'object' && data && 'error' in data 
            ? (data as any).error 
            : `HTTP error! status: ${response.status}`,
          details: data,
          response
        };
        throw apiError;
      }

      if (returnFullResponse) {
        return {
          data,
          response,
          status: response.status,
          headers: response.headers
        } as ApiResponse<T>;
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      
      // Re-throw ApiError as-is, wrap other errors
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }
      
      throw {
        status: 500,
        message: error instanceof Error ? error.message : 'Network or unknown error',
        details: error
      } as ApiError;
    }
  }

  // New method for requests that need full response (auth endpoints)
  private async requestWithResponse<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, options, true) as Promise<ApiResponse<T>>;
  }

  // Blog API methods
  async getBlogPosts(tag?: string): Promise<BlogPost[] | BlogPostsResponse> {
    const params = tag ? `?tag=${encodeURIComponent(tag)}` : '';
    return this.request<BlogPost[] | BlogPostsResponse>(`/api/blog${params}`) as Promise<BlogPost[] | BlogPostsResponse>;
  }

  async getBlogPost(id: string): Promise<BlogPost> {
    return this.request<BlogPost>(`/api/blog/${id}`) as Promise<BlogPost>;
  }

  async createBlogPost(data: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
    return this.request<BlogPost>('/api/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    }) as Promise<BlogPost>;
  }

  async updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    return this.request<BlogPost>(`/api/blog/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }) as Promise<BlogPost>;
  }

  async deleteBlogPost(id: string): Promise<void> {
    return this.request<void>(`/api/blog/${id}`, {
      method: 'DELETE',
    }) as Promise<void>;
  }

  async getBlogTags(): Promise<string[]> {
    return this.request<string[]>('/api/blog-tags') as Promise<string[]>;
  }

  // Authentication API methods - return full response for cookie handling
  async register(data: { name: string; email: string; password: string }): Promise<ApiResponse<{ user: User; message: string }>> {
    return this.requestWithResponse<{ user: User; message: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }): Promise<ApiResponse<{ user: User; message: string }>> {
    return this.requestWithResponse<{ user: User; message: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    return this.requestWithResponse<{ message: string }>('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/me') as Promise<User>;
  }

  // Festivals API methods
  async getFestivals(): Promise<Festival[]> {
    return this.request<Festival[]>('/api/festivals') as Promise<Festival[]>;
  }

  async createFestival(data: Omit<Festival, 'id'>): Promise<Festival> {
    return this.request<Festival>('/api/festivals', {
      method: 'POST',
      body: JSON.stringify(data),
    }) as Promise<Festival>;
  }

  async deleteFestival(id: string): Promise<void> {
    return this.request<void>(`/api/festivals/${id}`, {
      method: 'DELETE',
    }) as Promise<void>;
  }

  // Lunar Calendar API methods
  async getLunarDates(): Promise<LunarDate[]> {
    return this.request<LunarDate[]>('/api/lunar-dates') as Promise<LunarDate[]>;
  }

  async getLunarDate(date: string): Promise<LunarDate> {
    return this.request<LunarDate>(`/api/lunar-dates/${date}`) as Promise<LunarDate>;
  }

  async convertSolarToLunar(data: { solarDate: string }): Promise<LunarDate> {
    return this.request<LunarDate>('/api/lunar-dates', {
      method: 'POST',
      body: JSON.stringify(data),
    }) as Promise<LunarDate>;
  }

  // Astrology API methods
  async getAstrologyReadings(): Promise<AstrologyReading[]> {
    return this.request<AstrologyReading[]>('/api/astrology') as Promise<AstrologyReading[]>;
  }

  async getAstrologyReading(id: string): Promise<AstrologyReading> {
    return this.request<AstrologyReading>(`/api/astrology/${id}`) as Promise<AstrologyReading>;
  }

  async createAstrologyReading(data: Omit<AstrologyReading, 'id' | 'createdAt'>): Promise<AstrologyReading> {
    return this.request<AstrologyReading>('/api/astrology', {
      method: 'POST',
      body: JSON.stringify(data),
    }) as Promise<AstrologyReading>;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/api/health') as Promise<{ status: string; timestamp: string }>;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();