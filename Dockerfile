FROM node:onbuild

ENTRYPOINT [ "node", "index.js", "--stream", "$MEETUP-STREAM", "--zk", "${ZK-HOST}"]