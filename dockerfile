# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Default environment
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Run app based on mode
CMD if [ "$NODE_ENV" = "production" ]; \
    then npm run build && npm start; \
    else npm run dev; \
    fi
