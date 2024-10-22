FROM node:21-alpine3.19

RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN npm i npm@latest -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "node index.js"]