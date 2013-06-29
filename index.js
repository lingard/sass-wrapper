var EventEmitter = require('events').EventEmitter;
var sass = new EventEmitter();

function prepArgs(options) {

	var args = [];
	
	if (options.filepath) {
		args.push(options.filepath);
	} else if (options.data) {
		if (!options.type) {
			options.type = 'scss';
		}
		args.push('--' + options.type);
	} else {
		throw new Error('Please either specify a filepath or data string to compile');
	}

	return args;
}

function compile(options) {

	var args = prepArgs(options);
	var child = require('child_process').spawn('sass', args);

	child.stdout.on('data', function (data) {
		sass.emit('success', new Buffer(data).toString('utf8'));
	});

	child.stderr.on('data', function (data) {
		sass.emit('error', new Buffer(data).toString('utf8'));
	});

	if (options.data) {
		child.stdin.setEncoding('utf8');
		child.stdin.write(options.data);
    	child.stdin.end();
    }
}

sass.compile = compile;
module.exports = sass;