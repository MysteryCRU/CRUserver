FROM node:0.12.7

RUN \
  sudo bash && \
  apt-get install git && \
  git clone https://github.com/MysteryCRU/CRUserver.git && \
  cd CRUserver && \
  npm install . && \
  node index.js
