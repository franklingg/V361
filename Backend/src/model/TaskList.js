const { Schema, model } = require('mongoose');

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