const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(`${__dirname}/client/dist/public`));

// create application/json parser
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//MongoDb
const {connect, Users} = require('./mongodb');
connect()
    .then(() => { console.log('MongoDb connected') })
    .catch((err) => { console.log(err) });

//API
app.post('/users', jsonParser, function(req, res) {
    Users.find({}, (err, users) => {
        res.status(200).send(users);
    });
});

app.get('*', function(req, res) {
    res.sendFile(`${__dirname}/client/dist/public/index.html`);
});

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
