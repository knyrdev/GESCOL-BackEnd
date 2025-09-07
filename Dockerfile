FROM node:20.17.0

WORKDIR /home/app

COPY package*.json ./

RUN npm ci --only=production

COPY  . .

FROM node:20.17.0

WORKDIR /home/app

COPY --from=build /home/app ./

EXPOSE 3001

CMD ["node", "index.js "]