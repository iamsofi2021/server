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
const { connect, Users, Items } = require('./mongodb');
connect()
    .then(() => { console.log('MongoDb connected') })
    .catch((err) => { console.log(err) });

//S3

const { upload, getList, getImage } = require('./s3');

//API
app.post('/user', jsonParser, function (req, res) {
    Users.find(req.body, (err, users) => {
        if (err || users.length == 0) {
            res.status(200).send({ message: 'Користувача не знайдено' });
        } else {
            res.status(200).send({ user: users[0] });
        }
    })
});

app.post('/register', jsonParser, function (req, res) {
    Users.find({ login: req.body.login }, (err, users) => {
        if (err || users.length == 0) {
            Users.create(req.body);
            res.status(200).send({ message: 'Користувача успішно створено', success: true });
        } else {
            res.status(200).send({ message: 'Користувач вже зареєстрований' });
        }
    })
});

app.post('/remind', jsonParser, function (req, res) {
    Users.find(req.body, (err, users) => {
        if (err || users.length == 0) {
            res.status(200).send({ message: 'Користувача не знайдено' });
        } else {
            res.status(200).send({ message: `Ваш пароль - ${users[0].password}`, success: true });
        }
    })
});

app.post('/update-user', jsonParser, function (req, res) {
    const filter = { _id: req.body._id };

    Users.findOneAndUpdate(filter, req.body, { new: true }, (err, user) => {
        if (err) {
            res.status(200).send({ message: 'Користувача не знайдено' });
        } else {
            res.status(200).send({ message: 'Профіль успішно оновлено', success: true, user });
        }
    })
});

app.post('/add-item', jsonParser, function (req, res) {
    Users.find({ login: req.body.user.login, password: req.body.user.password }, (err, users) => {
        if (err || users.length == 0) {
            res.status(200).send({ message: 'Користувача не знайдено' });
        } else {
            if (!users[0].isAdmin) {
                res.status(200).send({ message: 'Користувач не може добавляти пост' });
            } else {
                delete req.body.user;
                Items.create(req.body);
                res.status(200).send({ message: 'Товар успішно додано', success: true });
            }

        }
    })
});

app.post('/get-list', function (req, res) {
    Items.find({}, (err, items) => {
        if (err || items.length == 0) {
            res.status(200).send({ message: 'Товари не знайдено' });
        } else {
            res.status(200).send({ items, success: true });
        }
    });
});

// app.post('/get-image',jsonParser, function(req, res) {
//     getImage(req.body.key).then(image => {
//         res.status(200).send(image);
//     });
// });

app.post('/upload', upload.array('image', 1), (req, res) => {
    Items.create({ ...req.body, image: req.file });
    res.status(200).send({ message: 'Товар успішно додано', success: true });
});

app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/client/dist/public/index.html`);
});

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
