const express = require('express');
const Datastore = require('nedb');
const port = process.env.PORT || 3000;
const app = express();
app.listen(port, () => console.log('started listening'));
app.use(express.static('public'));

const database = new Datastore('database.db');
database.loadDatabase();