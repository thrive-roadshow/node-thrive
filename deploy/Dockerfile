FROM node:20.13.0-alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --ignore-scripts --omit=dev && npm cache clean --force

EXPOSE 9000

CMD ["npm", "start"]