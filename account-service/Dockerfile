FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

CMD ["yarn", "start"]
