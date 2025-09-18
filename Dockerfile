FROM node:20.17.0-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["node", "index.js", "--name", "gescol-backend", "--env", "production"]