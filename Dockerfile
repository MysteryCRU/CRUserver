FROM node:0.12.7

RUN \
  apt-get install git && \
  git clone https://github.com/MysteryCRU/CRUserver.git && \
  cd CRUserver && \
  npm install .

CMD ["node", "/CRUserver/index.js"]
