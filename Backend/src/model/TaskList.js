const { Schema, model } = require('mongoose');
const Task = require('./Task');

const TaskListSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: "#FFF"
    },
    tasks: [{
        type: Schema.ObjectId,
        ref: 'Task',
    }]
},
    {
        timestamps: true,
    });

module.exports = model('TaskList', TaskListSchema);