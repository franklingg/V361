const { Schema, model } = require('mongoose');
const TaskModel = require('./Task');

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
        type: TaskModel.schema,
        ref: 'Task',
    }],
    __v: {
        type: Number,
        select: false
    }
},
    {
        timestamps: true,
    });

module.exports = model('TaskList', TaskListSchema);