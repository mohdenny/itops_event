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
    note: {
        type: String
    },
    items: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            name: {
                type: String
            },
            name_item: {
                type: String,
                required: true
            },
            fa: {
                type: String
            },
            brand: {
                type: String
            },
            type: {
                type: String,
                required: true
            },
            quantity: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    supports: [
        {
            user: {
                type: Schema.Types.ObjectId
            },
            name: {
                type: String,
                required: true
            },
            name_support: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    edited: {
        type: Date,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('event', EventSchema);