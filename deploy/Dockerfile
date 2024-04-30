FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm i --omit=dev && npm cache clean --force

EXPOSE 9000

CMD ["npm", "start"]