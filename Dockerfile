# ---- Dependencies Stage ----
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ---- Builder Stage ----
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN npx next build

# ---- Production Stage ----
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to nextjs user
USER nextjs

# Expose port
EXPOSE 3000

# Set port environment variable
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

# Start the application
CMD ["node", "server.js"]