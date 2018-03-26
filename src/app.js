const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/api');

app.use(bodyParser.json());
app.use(routes);

var dbconfig = require('./config/database.config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.url);

mongoose.connection.on('error', function(err) {
    console.log('Could not connect to the database. ');
    console.log(err);
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log('Connection established successfully!!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));