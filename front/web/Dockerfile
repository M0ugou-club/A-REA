FROM node

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 4200

CMD ["npm", "run", "prod"]