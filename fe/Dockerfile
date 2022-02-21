FROM node:lts-alpine3.14 as builder
ARG REACT_APP_BACKEND_URL
WORKDIR /usr/src/app
COPY . .
RUN npm i && npm run build

FROM nginx:mainline-alpine-perl
WORKDIR /var/www/html
EXPOSE 80
COPY --from=builder /usr/src/app/build .
COPY ./default.conf /etc/nginx/conf.d/
