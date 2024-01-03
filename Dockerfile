FROM node:18-slim

RUN mkdir -p /app/ && chmod -R 755 /app/
WORKDIR /app/

COPY ./ /app/
RUN yarn install && yarn build:prod && yarn cache clean && rm -rf node_modules
WORKDIR /app/dist-server
RUN yarn install && yarn cache clean && mv node_modules ..
EXPOSE 8080
CMD yarn start