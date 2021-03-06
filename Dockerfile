FROM node:alpine as builder

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci --silent

COPY webpack.common.js webpack.dev.js webpack.prod.js /app/
COPY env /app/env
COPY src /app/src
COPY .env.defaults /app/
RUN npm run build

FROM nginx:mainline

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
