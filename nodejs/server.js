const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto');
const app = express()
const port = 4000

app.use(bodyParser.raw({ type: "*/*"}));

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.get('/webhook', (req, res) => {
    console.log("Webhook get request echo: " + req.query.echo)

    res.contentType("text/plain").status(200).send(req.query.echo);
})

var secret = "test-example-secret-with-minimum-length-32";

app.post('/webhook', function (req, res) {
    console.log("Got a webhook post request with the body:")
    console.log(req.body.toString());
    var hash = req.headers.signature.replace("sha256=", "");

    var secret = "test-example-secret-with-minimum-length-32-chars";
    var calculatedHash = crypto.createHmac('sha256', secret).update(req.body).digest('hex');

    if(hash.toLocaleLowerCase() != calculatedHash.toLocaleLowerCase()) {
        console.log("hash error");
    }

    res.send('OK')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))