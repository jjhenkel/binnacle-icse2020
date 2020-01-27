FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch

RUN apt-get update && apt-get install -y --no-install-recommends jq xz-utils

COPY ./.nuget/ /root/.nuget/

COPY . /app/

ENTRYPOINT [ "/app/entrypoint.sh" ]
