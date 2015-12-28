FROM node:onbuild

ENV zk_host=zk:2181
ENV stream=rsvps

CMD node ws_rsvps.js --stream ${stream} --zk ${zk-host}