
// Require anything in lib
require.paths.unshift(__dirname + '/lib');

/**
 * Module dependencies.
 */

var express = require('express');

var app = express.createServer();

require('./mvc').boot(app);

app.listen(3000);
console.log('Express app started on port 3000');
