const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
const { events } = require('../../models/Event');

// @route    POST api/events
// @desc     Create a event
// @access   Private
router.post(
    '/',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    try {
        const user = await User.findById(req.user.id).select('-password');

        // build a event
        const newEvent = new Event({
            user: req.user.id,
            title: req.body.title,
            name: user.name,
            avatar: user.avatar,
            description: req.body.description,
            location: req.body.location,
            from: req.body.from
        });

        const post = await newEvent.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);
  
// @route    GET api/events
// @desc     Get all events
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
  
// @route    GET api/events/:id
// @desc     Get event by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
    }

        res.json(event);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/event/:id
// @desc     Delete a event
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
    
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
    
        // Check user
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Event not authorized' });
        }
    
        await event.remove();
    
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/events/item
// @desc     Add events item
// @access   Private
router.put(
    '/item',
    auth,
    check('name', 'Item name is required').notEmpty(),
    check('type', 'Type is required').notEmpty(),
    check('quantity', 'Quantity is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            const event = await Event.findOne({ user: req.user.id });

            event.items.unshift(req.body);
    
            await event.save();
    
            res.json(event);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/events/item/:item_id
// @desc     Delete item from events
// @access   Private

router.delete('/item/:item_id', auth, async (req, res) => {
    try {
        const foundEvent = await Event.findOne({ user: req.user.id });

        foundEvent.items = foundEvent.items.filter(
            (item) => item._id.toString() !== req.params.item_id
    );

        await foundEvent.save();
        return res.status(200).json(foundEvent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

// @route    POST api/events/support/:id
// @desc     support on a post
// @access   Private
router.post(
    '/support/:id',
    auth,
    checkObjectId('id'),
    check('user', 'user is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            const user = await User.findById(req.body.user).select('-password');
            const event = await Event.findById(req.params.id);
    
            const newSupport = {
                name: user.name,
                avatar: user.avatar,
                user: req.body.user
            };
    
            event.supports.unshift(newSupport);
    
            await event.save();
    
            res.json(event.supports);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/events/support/:id/:support_id
// @desc     Delete support
// @access   Private
router.delete('/support/:id/:support_id', auth, async (req, res) => {
        try {
        const event = await Event.findById(req.params.id);
    
        // Pull out support
        const support = event.supports.find(
            (support) => support.id === req.params.support_id
        );
        // Make sure support exists
        if (!support) {
            return res.status(404).json({ msg: 'Support does not exist' });
        }
        // Check user
        if (support.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Onduty support not authorized' });
        }
    
        event.supports = event.supports.filter(
            ({ id }) => id !== req.params.support_id
        );
    
        await event.save();
    
        return res.json(event.supports);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
});

module.exports = router;