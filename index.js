const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('hello {port}'));
app.use(express.static('public'));

