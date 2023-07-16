FROM node:16.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Set npm version explicitly
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Stage 2: Run test cases
FROM builder AS tester

# Install devDependencies for testing
RUN yarn install --frozen-lockfile --production=false

# Run test cases
RUN yarn test

# Stage 3: Run the system
FROM node:16.14.0-alpine

WORKDIR /app

# Install MySQL client
RUN apk --no-cache add mysql-client

# Copy built application from the builder stage
COPY --from=builder /app .

# Install Redis server
RUN apk --no-cache add redis

# Expose the port used by the application
EXPOSE 3000

# Run the Redis server and the system
CMD redis-server & npm run dev
