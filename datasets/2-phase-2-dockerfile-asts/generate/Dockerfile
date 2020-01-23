FROM haskell:8.0.2

RUN git clone \
    https://github.com/koalaman/shellcheck.git \
    /shellcheck \
  && cd /shellcheck \
  && cabal update \
  && cabal install \
  && cabal build

RUN echo "deb http://archive.debian.org/debian jessie-backports main" \
    > /etc/apt/sources.list.d/jessie-backports.list; \
  sed -i '/deb http:\/\/deb.debian.org\/debian jessie-updates main/d' /etc/apt/sources.list; \
  apt-get -o Acquire::Check-Valid-Until=false update; \
  apt-get install -y --no-install-recommends jq python3 python3-pip   

WORKDIR /app

COPY app.hs /build/

RUN ghc /build/app.hs

COPY filter-*.jq /filters/

COPY app.py /app.py

ENTRYPOINT [ "python3", "/app.py" ]
