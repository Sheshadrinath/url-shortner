const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/api');

app.use(bodyParser.json());
app.use(routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));