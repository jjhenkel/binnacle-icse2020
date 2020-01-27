FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch

RUN apt-get update && apt-get install -y --no-install-recommends jq xz-utils

COPY . /app/

RUN cd /app/idioms && dotnet build

ENTRYPOINT [ "/app/entrypoint.sh" ]
