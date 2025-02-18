# Use Node base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Start the application
CMD ["npm", "start"]