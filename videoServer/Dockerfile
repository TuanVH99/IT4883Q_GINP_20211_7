FROM node
WORKDIR /video_server
COPY package.json .
RUN npm install 
COPY . . 
CMD [ "node", "index.js" ]