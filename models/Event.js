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
    items: [
        {
            name: {
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
            }
        }
    ],
    support: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date
    },
    location: {
        type: String,
        required: true
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