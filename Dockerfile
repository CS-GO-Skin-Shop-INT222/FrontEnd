FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

RUN apk add curl

CMD [ "npm", "start" ]
