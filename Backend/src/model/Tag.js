const { Schema, model } = require('mongoose');

const TagSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: "#000"
    },
    textColor: {
        type: String,
        required: false,
        default: "#FFF"
    },
    __v: {
        type: Number,
        select: false
    }
},
    {
        timestamps: true,
        id: true
    });

module.exports = model('Tag', TagSchema);