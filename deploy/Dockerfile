FROM node:20-alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

# Install git
RUN apk add --no-cache git

USER nonroot

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --ignore-scripts --omit=dev && npm cache clean --force

RUN npm install --ignore-scripts --omit=dev github:thrive-roadshow/all-in-one

EXPOSE 9000

CMD ["npm", "start"]