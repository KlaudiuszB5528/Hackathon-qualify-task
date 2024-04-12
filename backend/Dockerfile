# Define the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

ENV DATABASE_URL=postgresql://admin:admin@postgres:5432/team4-db?schema=public

COPY prisma ./prisma
COPY entrypoint.sh ./

# Generate Prisma client and run migrations
RUN npx prisma generate

RUN chmod +x entrypoint.sh


# Expose the port
EXPOSE 8000

# Start the server
CMD [ "npm", "start" ]