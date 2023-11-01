# Use an official Node.js runtime as a parent image
FROM node:18.5.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Copy the rest of your application code to the container
COPY . .

# Install application dependencies
RUN npm install

# Rebuild bcrypt package from source
RUN npm rebuild bcrypt --build-from-source

# Build your TypeScript code
RUN npm run build

# Expose the port your application will listen on
EXPOSE 8080

# Start your application
CMD ["node", "dist/server.js"]
