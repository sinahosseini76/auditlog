# Use the official Node.js 14.x image as the base image
FROM node:18.15.0

# Set the working directory to /app
WORKDIR /var/www/app

# Copy the package.json and package-lock.json files to the container
COPY ./Web/package*.json ./

# Install the dependencies
RUN yarn install
#
## Copy the rest of the app files to the container
COPY ./Web ./
#
## Expose port 3000 for the app to listen on
EXPOSE 3003
#
## Define the command to start the app
CMD [ "yarn", "start" ]