#!/usr/bin/env bash
/CRUserver/cacheServer/ServerInit.bash
/CRUserver/cacheServer/PullData.bash $1 $2 $3
node /CRUserver/index.js
