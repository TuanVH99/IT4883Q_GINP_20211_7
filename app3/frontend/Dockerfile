
FROM node:12-alpine AS build-stage
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build


FROM nginx AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]