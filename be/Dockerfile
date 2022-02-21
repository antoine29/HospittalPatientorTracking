FROM node:lts-alpine3.14
WORKDIR /usr/src/app
COPY . .

RUN npm i && npm install prisma
CMD npm run prisma-push && npm run build && npm run start