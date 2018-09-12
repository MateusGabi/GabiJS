const express = require('express')
const app = express()

// app.use('/', express.static('/public'))
app.use(express.static(__dirname + '/public'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(9410, () => console.log('Server listen *:9410'))