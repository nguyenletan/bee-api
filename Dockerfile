FROM node:18
WORKDIR /usr/src/app


COPY package*.json ./
COPY . . 

RUN ls /usr/src/app


RUN npm install

EXPOSE 4000

ENTRYPOINT npm run start

