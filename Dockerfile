FROM phusion/baseimage:0.9.16

MAINTAINER Christian Stussak <stussak@mfo.de>

# install dependencies
RUN DEBIAN_FRONTEND=noninteractive curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - \
    && DEBIAN_FRONTEND=noninteractive sudo apt-get install -y -q nodejs nginx git \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# download latest development version and install node.js dependencies
RUN mkdir -p /usr/local \
    && cd /usr/local/ && curl -0L https://github.com/hilbert/hilbert-ui/archive/master.tar.gz | tar -zx \
    && mv hilbert-ui-master hilbert-ui \
    && cd /usr/local/hilbert-ui/client && npm install \
    && cd /usr/local/hilbert-ui/server && npm install

# configure nginx
RUN echo '\
server {\n\
       listen       8080;\n\
       server_name  localhost;\n\
\n\
       location / {\n\
           root   /usr/local/hilbert-ui/client/public;\n\
           index index.html index.htm;\n\
       }\n\
\n\
       location /api/ {\n\
               proxy_pass http://127.0.0.1:3000/;\n\
               proxy_redirect default;\n\
               proxy_http_version 1.1;\n\
               proxy_set_header Upgrade $http_upgrade;\n\
               proxy_set_header Connection 'upgrade';\n\
               proxy_set_header Host $host;\n\
               proxy_cache_bypass $http_upgrade;\n\
       }\n\
\n\
       error_page   500 502 503 504  /50x.html;\n\
       location = /50x.html {\n\
           root   html;\n\
       }\n\
}\n'\
>> /etc/nginx/sites-enabled/hilbert-ui

# tell Docker which port is exposed by the container
EXPOSE 8080

# configure services for baseimage-docker's init system
RUN echo "#!/bin/sh\nnginx" > /etc/rc.local
RUN mkdir -p /etc/service/hilbert_ui_api \
    && echo "#!/bin/sh\ncd /usr/local/hilbert-ui/server/app\nexec node main.js" > /etc/service/hilbert_ui_api/run \
    && chmod +x  /etc/service/hilbert_ui_api/run

# use baseimage-docker's init system as entry point
ENTRYPOINT ["/sbin/my_init"]
