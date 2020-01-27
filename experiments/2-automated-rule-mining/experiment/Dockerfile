FROM mcr.microsoft.com/dotnet/core/runtime:3.1.1

RUN apt-get update && apt-get install -y --no-install-recommends jq xz-utils

COPY ./.nuget/ /root/.nuget/

COPY . /app/

ENTRYPOINT [ "/app/entrypoint.sh" ]
