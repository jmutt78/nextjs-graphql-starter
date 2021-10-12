FROM node:14.16.0

# Create app directory
WORKDIR /web/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .
COPY  .env ./

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000
CMD [ "yarn", "start" ]
USER node

