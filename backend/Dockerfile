# Define the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy the rest of the code
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 8000

# Start the server
CMD [ "sh","./start.sh" ]