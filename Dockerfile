FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

# Development
CMD ["yarn", "start:dev"]

# Production
# RUN yarn global add pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]