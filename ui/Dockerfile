# FROM node:14-slim
# WORKDIR /ui
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install
# COPY . .
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
# EXPOSE 8081
# # start the app, yarn or npm is ok
# CMD ["yarn", "start"]


# Stage 1
FROM node:14 as build-stage

WORKDIR /ui
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /ui/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'