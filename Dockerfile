FROM node

WORKDIR /usr/src/app
COPY . .

RUN npm config set registry https://repo.adeo.no/repository/npm-public/
RUN npm install express path mustache-express promise prom-client dotenv jsdom request

EXPOSE 8080

CMD ["npm", "start"]