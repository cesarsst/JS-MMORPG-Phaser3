const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    posx: {
        type: Number,
        required: true,
    },
    posy: {
        type: Number,
        required: true,
    },
    map: {
        type: Number,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
        required: true,
    },
    accountId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = model('Character', CharacterSchema);