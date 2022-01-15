FROM node
WORKDIR /be1
COPY package.json .
RUN npm install 
COPY . . 
CMD [ "node", "index.js" ]