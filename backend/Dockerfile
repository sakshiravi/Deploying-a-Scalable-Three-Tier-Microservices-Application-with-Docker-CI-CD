# Dockerfile for Node.js backend
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the backend
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
