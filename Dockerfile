FROM node:latest

# Create server directory
RUN mkdir -p /usr/src/ragsite
WORKDIR /usr/src/ragsite

# Copy package.json and yarn.lock into directory
COPY ./package.json /usr/src/ragsite/package.json
COPY ./package-lock.json /usr/src/ragsite/package-lock.json

# Install packages from lockfile
RUN npm install

# Copy code into directory
COPY . /usr/src/ragsite

# Expose the port 8080
EXPOSE 8080

# Set the startup command
CMD ["yarn", "start:hot"]
