FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /source

COPY Portfolio.Api/Portfolio.Api.csproj Portfolio.Api/
RUN dotnet restore Portfolio.Api/Portfolio.Api.csproj

COPY Portfolio.Api/ Portfolio.Api/
RUN dotnet publish Portfolio.Api/Portfolio.Api.csproj \
    --configuration Release \
    --output /app/publish \
    --no-restore \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "Portfolio.Api.dll"]
