const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRoute = require('@routes/index');
const taskListsRoute = require('@routes/taskLists');
const tasksRoute = require('@routes/tasks');
const tagsRoute = require('@routes/tags');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/task_lists', taskListsRoute);
app.use('/tasks', tasksRoute);
app.use('/tags', tagsRoute);

module.exports = app;