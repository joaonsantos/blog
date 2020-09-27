FROM node:alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent

COPY webpack.* ./
COPY src public env ./
COPY .env.defaults ./
RUN npm run build

FROM nginx:mainline

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/public /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html/dist

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
