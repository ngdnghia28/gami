# Vietnamese Lunar Calendar Web Application

## Overview

A modern web application for exploring Vietnamese lunar calendar traditions, built with React frontend and Express backend. The application provides lunar calendar conversion, astrology readings, and festival information, preserving and showcasing Vietnamese cultural heritage through an intuitive digital interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom Vietnamese cultural theme (red, gold, cream color palette)
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **Build System**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API with structured endpoints for lunar dates, festivals, and astrology readings
- **Data Storage**: In-memory storage with interfaces designed for easy database migration
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware with structured error responses

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
- **Development Server**: Vite dev server with hot module replacement for rapid development
- **Production Build**: Optimized builds with code splitting and static asset optimization
- **Code Quality**: TypeScript strict mode with path mapping for clean imports

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: PostgreSQL database connection (Neon serverless)

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **zod**: Runtime type validation
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay

### Database and Validation
- **drizzle-zod**: Drizzle to Zod schema integration
- **connect-pg-simple**: PostgreSQL session store
- **date-fns**: Date manipulation utilities

The application is configured for deployment on Replit with automatic builds and serves both development and production environments through a unified Express server that handles API routes and static file serving.