FROM node:onbuild

ENTRYPOINT ["node"]
CMD [ "index.js", "--stream", "$MEETUP-STREAM", "--zk", ${ZK-HOST}]