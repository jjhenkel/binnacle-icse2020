FROM node:11.15.0-stretch

RUN npm install -g \
  typescript \
  yargs@latest-13 \
  js-yaml \
  @types/node

ENV NODE_OPTIONS=--max_old_space_size=4096
ENV NODE_PATH=/usr/local/lib/node_modules

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 python3-pip \
  && pip3 install tqdm \
  && rm -rf /var/lib/apt/lists/*

RUN echo '#!/bin/bash\ntsc && node /build/app.js $@' > /run.sh \
  && chmod +x /run.sh

WORKDIR /app

COPY enrich/ /app/enrich/

COPY app.ts ast.ts app.py tsconfig.json /app/

RUN tsc 

ENTRYPOINT [ "python3", "/app/app.py" ]
