const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/api');

app.use(bodyParser.json());
app.use(routes);
app.use('/url', require('./controllers/mapping.controller'));
app.use('/mapping', require('./controllers/mapping.admin.controller'));
app.use('/random', require('./controllers/mapping.random.controller'));

app.listen(3000, () => console.log('UrlShortner app listening on port 3000!'));