FROM node:18-slim

RUN mkdir -p /app/ && chmod -R 755 /app/
WORKDIR /app/

COPY ./ /app/
RUN yarn install && yarn build:prod && yarn cache clean
EXPOSE 8080
CMD yarn ssr:prod