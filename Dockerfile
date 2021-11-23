# Base
FROM node:14.18.1-alpine3.14 AS base
WORKDIR /app

# Dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# Build
FROM dependencies AS build
COPY . .
RUN npm run build

# Production
FROM nginx:1.20.2-alpine AS production
COPY --chown=nginx:nginx --from=build /app/build /usr/share/nginx/html
EXPOSE 80
