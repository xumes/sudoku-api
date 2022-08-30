FROM node:18-alpine

WORKDIR /var/www/app

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]