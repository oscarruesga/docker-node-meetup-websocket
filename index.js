 var forever = require('forever-monitor');

var minimist = require('minimist')

var args = minimist(process.argv.slice(2), {
  string: 'stream',
  string: 'zk',
  default: { stream: 'RSVPS', zk: 'kafka:2181' },
});
 
  var child = new (forever.Monitor)('ws_rsvps.js', {
    max: 5,
    silent: false,
    args: [args.stream, args.zk],
    'spinSleepTime': 5000,
  });
 
  child.on('exit', function () {
    console.log('ws_rsvps.js has exited after 5 restarts');
  });
 
  
  setTimeout(function() {
  	console.log ('Starting Websocket stream: ' + args.stream + ' zk-host: ' + args.zk);
  }, 5000);
  //child.start();