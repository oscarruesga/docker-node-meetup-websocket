FROM node:onbuild


# RUN mkdir /opt/kafka-websocket
# COPY src /opt/kafka-websocket
# WORKDIR /opt/kafka-websocket

# RUN npm install kafka-node
# RUN npm install websocket
# RUN npm install minimist

CMD node ws_rsvps.js --stream rsvps --zk zk:2181