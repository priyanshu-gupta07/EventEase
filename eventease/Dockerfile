# Use Node.js as the base image to build the React app
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Use Nginx as the base image to serve the app
FROM nginx:alpine

# Copy the built files from the build stage to the Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which Nginx runs
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]