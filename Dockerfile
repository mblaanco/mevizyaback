
FROM node:latest
# MAINTAINER Murilo Blanco Flor <muriloblan@gmail.com>

WORKDIR /app

RUN git clone https://github.com/vishnubob/wait-for-it.git

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3333

CMD [ "npm", "start" ]
