# Step 1: Use a Node.js image to build the app
FROM node:lts AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files
COPY . .

# Step 6: Build the Vite application for production
RUN npm run build

# Step 7: Use a lightweight nginx image to serve the production build
FROM nginx:alpine

# Step 8: Copy the built files from the builder stage to nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to make the app accessible
EXPOSE 80

# Step 10: Start nginx server
CMD ["nginx", "-g", "daemon off;"]
