const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    description: {
        type: String
    },
    items: {
        type: [String],
        required: true
    },
    support: {
        type: [String]
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('event', EventSchema);