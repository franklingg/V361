const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRoute = require('@routes/index');
const taskListsRoute = require('@routes/taskLists');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/task_lists', taskListsRoute);

module.exports = app;