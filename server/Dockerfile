FROM node:18.7.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
CMD ["npm","run","start-server"]

EXPOSE 9000