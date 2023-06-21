var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.pluralize(null);

const port = 1000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
mongoose.connect('mongodb+srv://somipak:FpeReqjjINnpNUMs@somipak.o0y1zoo.mongodb.net/SomiClothings', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB ERROR => ", err));;
var db = mongoose.connection;
db.once('open', function () { });

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
},
    { versionKey: false });

var orderSchema = new mongoose.Schema({
    UserInfo: mongoose.Mixed,
    Order: mongoose.Mixed,
},
    { versionKey: false });


var productSchema = new mongoose.Schema({
    name: String,
    price: String,
    oldPrice: String,
    sale: Boolean,
    description: String,
    imageSrc: Array,
    size: mongoose.Mixed,
    type: String,
    tags: Array
},
    { versionKey: false });

var User = mongoose.model('UserDataBase', userSchema);
var Products = mongoose.model('ProductDataBase', productSchema);
var Orders = mongoose.model('OrderDataBase', orderSchema);

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/checkUsername', (req, res) => {
    try {
        User.find(
            { 'username': { $in: req.body.username } }
        ).then(userFound => {
            if (Object.keys(userFound).length === 0) {
                return res.status(200).send({ unique: true });
            }
            else {
                return res.status(200).send({ unique: false });
            }
        })
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/checkPhone', (req, res) => {
    try {
        User.find(
            { 'phone': { $in: req.body.phone } }
        ).then(userFound => {
            if (Object.keys(userFound).length === 0) {
                return res.status(200).send({ unique: true });
            }
            else {
                return res.status(200).send({ unique: false });
            }
        })
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/loginUser', (req, res) => {
    try {
        User.find(
            { 'phone': { $in: req.body.phone } }
        ).then(userFound => {
            if (userFound && userFound[0].password == req.body.password) {
                return res.status(200).send({ message: 'User found!', user: userFound[0] });
            }
            else {
                return res.status(200).send({ message: 'Password incorrect!', incorrectPassword: true });
            }
        })
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.post('/addNewUser', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
    });

    user.save(function (err) {
        res.status(200).send({
            success: 'true',
            message: 'User Created',
            user,
        })
        if (err) {
            res.status(404).send({
                error: err,
            })
        }
    })
})

app.post('/addNewProduct', (req, res) => {
    let typeLowCase = req.body.type.toLowerCase();
    const product = new Products({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageSrc: req.body.imageSrc,
        size: req.body.size,
        type: typeLowCase,
        tags: req.body.tags
    });

    product.save(function (err) {
        res.status(200).send({
            success: 'true',
            message: 'Product Created',
            product,
        })
        if (err) {
            res.status(404).send({
                error: err,
            })
        }
    })
})

app.post('/addNewOrder', (req, res) => {
    const order = new Orders({
        UserInfo: req.body.UserInfo,
        Order: req.body.Order,
    });

    order.save(function (err) {
        res.status(200).send({
            success: 'true',
            message: 'Order Added',
            order,
        })
        if (err) {
            res.status(404).send({
                error: err,
            })
        }
    })
})

app.get('/findProduct/:id', (req, res) => {
    try {
        Products.find(
            { '_id': { $in: req.params.id } }
        ).then(productFound => {
            return res.status(200).send({
                product: productFound[0]
            })
        })
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/getAllProducts', (req, res) => {
    try {
        Products.find().then(productFound => {
            return res.status(200).send({
                data: productFound
            })
        })
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).send(error);
    }
})

app.get('/findProductByType/:type', (req, res) => {
    try {
        Products.find(
            { 'type': { $in: req.params.type.toLowerCase() } }
        ).then(productFound => {
            return res.status(200).send({
                productFound
            })
        })
            .catch(err => res.status(404).send(err));
    }
    catch (error) {
        res.status(500).send(error);
    }
})