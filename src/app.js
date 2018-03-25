const express = require('express');
const _ = require('lodash');
const mappingContent = require('./mapping.json');

const app = express();

app.get('/', (req, res) => {

    var queryString = req.url;
    _.filter(mappingContent.mappings, function(map) {
        var requestUrl = req.url.replace('/?q=', '');
        if (map.from.indexOf(requestUrl) > -1) {
            res.status(301).redirect(map.to);
            return;
        }
    });
    res.status(404).send('Page Not Found!!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));