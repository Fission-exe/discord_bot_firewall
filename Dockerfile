FROM node
RUN apt-get update && apt-get install -y cron apt-transport-https ca-certificates wget zip python3 && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg && \
    mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/ && \
    wget -q https://packages.microsoft.com/config/debian/10/prod.list && \
    mv prod.list /etc/apt/sources.list.d/microsoft-prod.list && \
    chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg && \
    chown root:root /etc/apt/sources.list.d/microsoft-prod.list && apt-get update && apt-get install -y dotnet-runtime-3.1 && apt-get autoremove
WORKDIR /usr/src
RUN wget https://github.com/Tyrrrz/DiscordChatExporter/releases/download/2.18/DiscordChatExporter.CLI.zip && unzip DiscordChatExporter.CLI.zip -d DiscordChatExporter.CLI && chmod -R 777 DiscordChatExporter.CLI && mkdir -p /var/exports && chmod -R 777 /var/exports
WORKDIR /var/exports
RUN python3 -m http.server &
WORKDIR /usr/src/app
COPY . .
RUN chmod 777 public/exports && echo "00 00 * * * rm -f /usr/src/app/public/exports/*" >> mycron && crontab mycron && npm install
EXPOSE 8080
USER 1001
CMD cd /var/exports/ && python3 -m http.server & node bin/www