const config = require('./build/config');

module.exports = function (cwd, options) {
	options = options || {}

	config.init(cwd)

	const port = options.port || 3000
	const server = require('./build/server')
	server.listen(port)

	console.log('listening on port ' + port)
}