FROM node:onbuild

ENV zk_host=kafka:2181
ENV stream=rsvps

# CMD node ws_rsvps.js --stream ${stream} --zk ${zk-host}
CMD node ws_rsvps.js
