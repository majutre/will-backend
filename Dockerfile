FROM node:18-alpine

ENV NODE_ENV development

COPY package.json .
COPY package-lock.json .

WORKDIR /home/majutrevisan/Documents/Ruby/will-backend

COPY . .

RUN npm install

CMD npm run start:dev
