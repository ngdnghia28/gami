# Vietnamese Lunar Calendar Web Application

## Overview

A modern web application for exploring Vietnamese lunar calendar traditions, fully migrated to Next.js 13+ with app router for enhanced SEO and performance. The application provides lunar calendar conversion, astrology readings, and festival information, preserving and showcasing Vietnamese cultural heritage through an intuitive digital interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Architecture (Next.js 13+ App Router)
- **Framework**: Next.js 13+ with App Router for server-side rendering and enhanced SEO
- **Frontend**: React 18 with TypeScript for type safety and modern development
- **Routing**: Next.js App Router with file-based routing system
- **State Management**: TanStack Query for client-side state management and caching
- **Styling**: Tailwind CSS with custom Vietnamese cultural theme (red, gold, cream color palette)
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **API Routes**: Next.js API routes for serverless backend functionality
- **Language**: Full-stack TypeScript for end-to-end type safety
- **Data Validation**: Zod schemas for request/response validation
- **SEO**: Built-in metadata API for optimal search engine optimization

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Structure**:
  - `users`: User authentication and management
  - `lunar_dates`: Solar to lunar date conversion data with Can Chi and zodiac information
  - `festivals`: Traditional Vietnamese festivals with lunar calendar dates
  - `astrology_readings`: Birth chart calculations and personality readings
- **Migration Strategy**: Drizzle Kit for schema migrations and database versioning

### Cultural Calculation Engine
- **Lunar Calendar**: Vietnamese lunar calendar conversion algorithms with Can Chi (Heavenly Stems and Earthly Branches) system
- **Astrology System**: Traditional Vietnamese astrology calculations including Four Pillars of Destiny
- **Festival Database**: Comprehensive collection of Vietnamese traditional festivals with lunar dates

### Development Workflow
- **Development Server**: Next.js development server with fast refresh and hot reloading
- **Production Build**: Optimized builds with automatic code splitting and static optimization
- **Code Quality**: TypeScript strict mode with path mapping for clean imports
- **SEO Optimization**: Server-side rendering and static generation for better search engine visibility

## Application Status
The application is fully migrated to Next.js 13+ App Router:
- ✅ Next.js App Router with file-based routing
- ✅ Next.js API routes for backend functionality
- ✅ React 18 with TypeScript integration
- ✅ Tailwind CSS with custom Vietnamese cultural design
- ✅ SEO optimization with Next.js metadata API
- ✅ Database integration with Drizzle ORM

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Development Tools
- **typescript**: Static type checking
- **zod**: Runtime type validation
- **next**: React framework with built-in development server

### Database and Validation
- **drizzle-zod**: Drizzle to Zod schema integration
- **date-fns**: Date manipulation utilities

The application is configured for deployment on Replit with Next.js built-in server handling both development and production environments with automatic builds and optimizations.