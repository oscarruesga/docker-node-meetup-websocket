 	var forever = require('forever-monitor');

 	var Tutum = require('./tutum');

	var minimist = require('minimist')

	var args = minimist(process.argv.slice(2), {
		string: ['stream', 'zk', 'tutum-user', 'tutum-key'],
		default: { stream: 'RSVPS', zk: 'kafka:2181', tutum_user: 'oscarruesga', tutum_key: '5a33da87970a7b7c7044dce22217c3336b2072132ac8c71b' },
	});
	
	var host = args.zk;

	var child = new (forever.Monitor)('ws_rsvps.js', {
		max: 5,
		silent: false,
		args: ['--stream', args.stream, '--zk', host],
		'spinSleepTime': 5000,
	});

	if (args.tutum_user != '' && args.tutum_key!= '') {
		var tutum = new Tutum({
		  username: args.tutum_user,
    	  apiKey: args.tutum_key
		});

		tutum.get('/container/', { name: 'kafka-1' }, function (err, res) {
		  if (err) {
		    throw err;
		  }
		  
		  if (res.objects[0].private_ip) {
		  	console.log (res.objects[0].private_ip);
		  	host = res.objects[0].private_ip + ':2181';
		  }
		  launchApp ();
		});


	} else {
		launchApp ();
	}


	function launchApp () {
		var child = new (forever.Monitor)('ws_rsvps.js', {
			max: 5,
			silent: false,
			args: ['--stream', args.stream, '--zk', host],
			'spinSleepTime': 5000,
		});

		child.on('watch:restart', function(info) {
		    console.error('Restaring script because ' + info.file + ' changed');
		});

		child.on('restart', function() {
		    console.error('Forever restarting script for ' + child.times + ' time');
		});

		child.on('exit:code', function(code) {
		    console.error('Forever detected script exited with code ' + code);
		});
	
		child.start();
	}
 
	


	