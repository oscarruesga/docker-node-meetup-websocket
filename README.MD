Meetup Websocket in NodeJS
==========================

This repository contains a Docker file to build a Docker image with NodeJS and a Websocket to read the RSVPS Meetup Stream.


##Pull the image from Docker Repository
```
docker pull oscarruesga/node-meetup-websocket:latest
```

## Building the image
```
docker build --rm -t oscarruesga/node-meetup-websocket:latest .
```

## Running the image

```
docker run -it -h sandbox oscarruesga/node-meetup-websocket:latest bash
```
or
```
docker run -d -h sandbox oscarruesga/node-meetup-websocket:latest -d
```

## Versions
```
Hadoop 2.6.0 and Apache Spark v1.5.1 on Centos 
```
