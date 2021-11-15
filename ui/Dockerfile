FROM node:14-slim
WORKDIR /ui
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
EXPOSE 8081
# start the app, yarn or npm is ok
CMD ["yarn", "start"]