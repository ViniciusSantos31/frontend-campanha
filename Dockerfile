# Step 1: Use Node.js base image
FROM node:lts

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application for production
RUN npm run build

# Step 8: Run Vite's built-in preview server
CMD ["npm", "run", "preview"]
