const { Schema, model } = require('mongoose');
const TagModel = require('./Tag');

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: false,
        default: false
    },
    start_date: {
        type: Date,
        required: false
    },
    finish_date: {
        type: Date,
        required: false
    },
    tags: [{
        type: TagModel.schema,
        ref: 'Tag',
    }],
    __v: {
        type: Number,
        select: false
    }
},
    {
        timestamps: true,
        id: true
    });

module.exports = model('Task', TaskSchema);