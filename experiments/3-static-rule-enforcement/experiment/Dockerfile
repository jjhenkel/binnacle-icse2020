FROM node:11.15.0-stretch

RUN echo '#!/bin/bash\ntsc && node /build/app.js $@' > /run.sh \
  && chmod +x /run.sh && apt-get update && apt-get install -y --no-install-recommends jq 

RUN npm install -g \
  typescript \
  @types/node@12.12.23 \
  threads

ENV NODE_PATH=/usr/local/lib/node_modules

WORKDIR /app

COPY . /app/

ENTRYPOINT [ "/app/entrypoint.sh" ]