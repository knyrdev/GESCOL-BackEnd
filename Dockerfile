FROM node:20.17.0

WORKDIR /home/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["pm2-runtime", "start", "index.js", "--name", "gescol-backend", "--env", "production"]