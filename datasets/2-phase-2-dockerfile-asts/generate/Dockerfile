FROM haskell:8.0.2

RUN git clone \
    https://github.com/koalaman/shellcheck.git \
    /shellcheck \
  && cd /shellcheck \
  && git checkout 37e78141bd57f56b2a8d7ec0c91e76edec6a9dc5 \
  && cabal update \
  && cabal install \
  && cabal build

RUN echo "deb http://archive.debian.org/debian jessie-backports main" \
    > /etc/apt/sources.list.d/jessie-backports.list; \
  sed -i '/deb http:\/\/deb.debian.org\/debian jessie-updates main/d' /etc/apt/sources.list; \
  apt-get -o Acquire::Check-Valid-Until=false update; \
  apt-get install -y --no-install-recommends jq python3 python3-pip   

RUN pip3 install tqdm==4.27.0

WORKDIR /app

COPY app.hs /build/

RUN ghc /build/app.hs

COPY filter-*.jq /filters/

COPY app.py /app.py

ENTRYPOINT [ "python3", "/app.py" ]
