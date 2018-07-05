FROM node:carbon

WORKDIR /usr/src/app

RUN npm install

COPY package.json ./

COPY . .
EXPOSE 8080

CMD ["npm", "start-express"]