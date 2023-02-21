FROM node

RUN mkdir /app

WORKDIR /app

COPY package.json /app/

COPY package-lock.json /app/

RUN npm install

ADD . /app/