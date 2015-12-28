var WebSocketClient = require('websocket').client;

var minimist = require('minimist')

var args = minimist(process.argv.slice(2), {
  string: 'stream',
  string: 'zk',
  default: { stream: 'RSVPS', zk: 'localhost:2181' },
});


var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Client = kafka.Client;
var client = new Client(args.zk);
var topic = "WS_" + args.stream.toUpperCase();
var producer = new Producer(client, { requireAcks: 0 });

console.log("TOPIC: " + topic);
console.log("ZK: " + args.zk);

var ws_client = new WebSocketClient();

ws_client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

ws_client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");

	        /*
	            Creating a payload, which takes below information
	            'topic'     -->    this is the topic we have created in kafka.
	            'messages'     -->    data which needs to be sent to kafka. 
	            'partition' -->    which partition should we send the request to.
	                            If there are multiple partition, then we optimize the code here,
	                            so that we send request to different partitions. 

	        */
	        payloads = [
		        { topic: topic, messages: message.utf8Data, partition: 0 }
		    ]

	        /*
	            send payload to kafka.
	        */

            producer.send(payloads, function(err, data){
                    console.log("Sending: " + data);
            });

	        /*
	            if we have some error.
	        */
	        producer.on('error', function(err){
	        	//console.log('Error: ' + err);

	        })

        }
    });


});

ws_client.connect('ws://stream.meetup.com/2/rsvps');