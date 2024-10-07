FROM node

WORKDIR /app

COPY . .

RUN npm install -g eas-cli

RUN eas build --platform android --local

EXPOSE 4200

CMD ["npx", "expo", "start"]