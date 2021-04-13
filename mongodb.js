//MongoDb
const mongo = require('mongoose');

async function connect() {
    mongo.connect(`mongodb+srv://${process.env.userName}:${process.env.userPwd}@cluster0.vfhby.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`, {
    // mongo.connect(`mongodb+srv://superadmin_01:Rassa_1001@cluster0.vfhby.mongodb.net/iamsofi?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

const UsersSchema = new mongo.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
});

const ItemsSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    createDate: {
        type: String,
        required: true,
    },
});

const Users = mongo.model('users', UsersSchema);
const Items = mongo.model('items', ItemsSchema);


module.exports.connect = connect;
module.exports.Users = Users;
module.exports.Items = Items;