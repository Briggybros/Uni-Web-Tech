FROM node:latest

# Create server directory
RUN mkdir -p /usr/src/ragsite
WORKDIR /usr/src/ragsite

# Copy package.json and yarn.lock into directory
COPY ./package.json /usr/src/ragsite/package.json
COPY ./yarn.lock /usr/src/ragsite/yarn.lock

# Install packages from lockfile
RUN yarn install --pure-lockfile

# Copy code into directory
COPY . /usr/src/ragsite

RUN yarn run build

# Expose the port 8080
EXPOSE 8080

# Set the startup command
CMD ["yarn", "start"]