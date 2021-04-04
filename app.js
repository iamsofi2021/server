const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
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

//S3

// const {upload, getList, getImage} = require('./s3');

//API
app.post('/user', jsonParser, function(req, res) {
    Users.find(req.body,(err, users) => {
        if (err || users.length == 0) {
            res.status(200).send({message: 'Користувача не знайдено'});
        } else {
            res.status(200).send({user: users[0]});
        }
    })
});

// app.post('/get-list', function(req, res) {
//     getList().then(images => {
//         res.status(200).send(images);
//     });
// });

// app.post('/get-image',jsonParser, function(req, res) {
//     getImage(req.body.key).then(image => {
//         res.status(200).send(image);
//     });
// });

// app.post('/upload', upload.array('image', 1), (req, res) => {
//     res.json({
//         'message': 'File uploaded succesfully.'
//     });
// });

app.get('*', function(req, res) {
    res.sendFile(`${__dirname}/client/dist/public/index.html`);
});

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
