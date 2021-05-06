FROM node:14-alpine as build

WORKDIR /app
COPY ./package.json ./package.json
RUN npm i
COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
COPY ./.env.production .

RUN npm run build

FROM nginx:1.19.0
COPY --from=build /app/build /build
COPY ./nginx.conf /etc/nginx/nginx.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
