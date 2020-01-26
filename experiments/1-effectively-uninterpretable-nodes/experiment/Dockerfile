FROM python:3.7.6-slim-stretch

RUN apt-get update \
  && apt-get install -y --no-install-recommends xz-utils \
  && rm -rf /var/apt/lists*

RUN pip3 install numpy

COPY . /app/

ENTRYPOINT [ "/app/entrypoint.sh" ]
