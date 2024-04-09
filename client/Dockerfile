FROM node:18.10.0-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli@16.2.0

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/defaulf.conf

COPY --from=build /app/dist/hhcs-manager /usr/share/nginx/html

EXPOSE 80
#RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

#CMD ["npm","run","start"]