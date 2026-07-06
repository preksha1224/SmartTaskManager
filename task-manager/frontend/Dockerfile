# Build stage
FROM node:22-alpine AS build

# Install build dependencies for native modules (like jsdom if needed)
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Runtime stage - Using Node for SSR support
FROM node:22-alpine

WORKDIR /app

# Copy the build output
COPY --from=build /app/dist/frontend ./dist/frontend
COPY --from=build /app/package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

EXPOSE 4000

# Start the SSR server
CMD ["node", "dist/frontend/server/server.mjs"]
