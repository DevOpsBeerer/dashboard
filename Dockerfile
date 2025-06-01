# Multi-stage build for SvelteKit 5
FROM node:24-alpine AS base

# Install dumb-init
RUN apk add --no-cache dumb-init

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

FROM base AS deps

# Install all dependencies (dev + prod)
RUN npm ci

FROM base AS build

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Ensure static directory exists (even if empty)
RUN mkdir -p static

FROM base AS runtime

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S sveltekit -u 1001

# Copy built application and necessary files
COPY --from=build /app/build ./build/
COPY --from=build /app/package.json ./
COPY --from=build /app/static ./static/

# Change ownership to sveltekit user
RUN chown -R sveltekit:nodejs /app

# Switch to non-root user
USER sveltekit

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "build"]