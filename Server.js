const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const next = require('next');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { parse } = require('url');

mongoose.pluralize(null);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const databaseURL = 'mongodb+srv://somipak:FpeReqjjINnpNUMs@somipak.o0y1zoo.mongodb.net/SomiClothings';

mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB ERROR => ', err));

const db = mongoose.connection;
db.once('open', function () {});

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cors());

  server.post('/checkUsername', (req, res) => {
    try {
      User.find({ 'username': { $in: req.body.username } })
        .then(userFound => {
          if (Object.keys(userFound).length === 0) {
            return res.status(200).send({ unique: true });
          } else {
            return res.status(200).send({ unique: false });
          }
        })
        .catch(err => res.status(404).send(err));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  server.post('/checkPhone', (req, res) => {
    try {
      User.find({ 'phone': { $in: req.body.phone } })
        .then(userFound => {
          if (Object.keys(userFound).length === 0) {
            return res.status(200).send({ unique: true });
          } else {
            return res.status(200).send({ unique: false });
          }
        })
        .catch(err => res.status(404).send(err));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  server.post('/loginUser', (req, res) => {
    try {
      User.find({ 'phone': { $in: req.body.phone } })
        .then(userFound => {
          if (userFound && userFound[0].password == req.body.password) {
            return res.status(200).send({ message: 'User found!', user: userFound[0] });
          } else {
            return res.status(200).send({ message: 'Password incorrect!', incorrectPassword: true });
          }
        })
        .catch(err => res.status(404).send(err));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  server.post('/addNewUser', (req, res) => {
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
      });
      if (err) {
        res.status(404).send({
          error: err,
        });
      }
    });
  });

  // Define other routes and handlers here

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
