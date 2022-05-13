FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Get dependencies from npm
RUN npm install

# Bundle app source
COPY . .

# Register slash commands with Discord API, then start the bot
CMD [ "sh", "-c", "npm run register && npm run start" ]