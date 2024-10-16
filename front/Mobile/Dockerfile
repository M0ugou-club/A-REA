FROM thyrlian/android-sdk

WORKDIR /app

COPY . .

ARG EXPO_TOKEN

RUN mv .git ./front/Mobile

WORKDIR ./front/Mobile

RUN ls -la

RUN apt-get update \
    && apt-get install nodejs npm git -y --no-install-recommends \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /usr/share/doc/* \
    && npm install eas-cli

RUN npm ci

RUN npm install expo

#RUN npx expo prebuild

RUN npx eas build -p android  --profile production --local --non-interactive
