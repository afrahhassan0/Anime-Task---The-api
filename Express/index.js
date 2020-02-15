// const config = require('config');
const expressServer = require('express');
const app = expressServer();
const bodyParser = require('body-parser');
const logger = require('../setting-up');
const anime = require('./routes/anime');
const reviews = require('./routes/reviews');
const users = require('./routes/users')
// const sql = require('mysql');


app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/anime' , anime );
app.use('/reviews' , reviews );
app.use('/users' , users);

const port = process. env.PORT || 3000;
app.listen(port , ()=>console.log(`On port ${port}`));

