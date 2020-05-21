const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('started listening'));
app.use(express.static('public'));

const database = new Datastore('database.db');
database.loadDatabase();