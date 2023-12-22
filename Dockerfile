FROM node:18-slim

RUN mkdir -p /app/ && chmod -R 755 /app/
WORKDIR /app/

COPY ./ /app/
RUN npm install && npm run build:prod
EXPOSE 8080
CMD npm run ssr:prod