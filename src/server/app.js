const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/api');

app.use(bodyParser.json());
app.use(routes);
app.use('/url', require('./controllers/mapping.controller'));
app.use('/mapping', require('./controllers/mapping.admin.controller'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));