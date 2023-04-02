FROM node:alpine
 
WORKDIR /usr/src/app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .

EXPOSE 42000
 
CMD [ "node", "app.js" ]