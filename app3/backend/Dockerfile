
FROM node:12-alpine
WORKDIR /backend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
