# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Copy the .env file to make it available during the build process
COPY .env.prod .env

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project (Vite will use environment variables during this step)
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine AS production

# Copy the built files from the build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the .env file to the production stage if needed
COPY .env.prod /usr/share/nginx/html/.env

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
