const express = require('express');
const router = express.Router();
const checkObjectId = require('../../middleware/checkObjectId');
const Event = require('../../models/Event');
const User = require('../../models/User');

// @route    post api/services/status/:id
// @desc     update events 
// @access   Private
router.put(
    '/status/:id',
    checkObjectId('id'),
    async (req, res) => {

        const updateEvent = {
            status: req.body.status
        };

        try {

            let event = await Event.findByIdAndUpdate(
                req.params.id ,
                { $set: updateEvent },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );

            return res.json(event);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;