FROM node:18

RUN mkdir -p /app/
WORKDIR /app/
RUN chmod -R 755 /app/

COPY ./ /app/
RUN yarn install
RUN yarn build:prod

EXPOSE 8080

CMD yarn ssr:prod