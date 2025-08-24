FROM node:alpine AS builder
WORKDIR /user/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:bundle


FROM node:alpine
WORKDIR /user/src/app
COPY --from=builder /user/src/app/dist/main.js ./dist/main.js
CMD ["node", "dist/main.js"]