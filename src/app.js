const express = require('express')
const mappingContent = require('./mapping.json')

const app = express()

app.get('/', (req, res) => {
    
    var queryString = req.url;
    mappingContent.mappings.forEach(obj => {
        var requestUrl = req.url.replace('/?q=', '')
        if (obj.from.indexOf(requestUrl) > -1) {
            res.status(301).redirect(obj.to)
            return;
        }
    });
    res.status(404).send('Page Not Found!!');
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))