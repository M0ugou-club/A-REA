FROM thyrlian/android-sdk

WORKDIR /app

COPY . .

ARG EXPO_TOKEN

RUN mv .git ./front/mobile

WORKDIR ./front/Mobile

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 20.12.2

RUN ls -la

RUN apt-get update \
    && apt-get install nodejs curl npm git -y --no-install-recommends \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /usr/share/doc/* \
    && npm install eas-cli expo

RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

SHELL ["/bin/bash", "-ec"]

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN node -v

RUN npm ci

RUN npx eas build -p android  --profile production --local --non-interactive --clear-cache