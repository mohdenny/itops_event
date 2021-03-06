const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Event = require('../../models/Event');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/events
// @desc     Create a event
// @access   Private
router.post(
    '/',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    check('start', 'Start date is required and needs to be from the past').notEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const { title, description, note, location, start, end, status }= req.body;

        const newEvent = new Event({
            user: req.user.id,
            title: title,
            name: user.name,
            avatar: user.avatar,
            description: description,
            note: note,
            location: location,
            start: start,
            end: end,
            status: status
        });

        const post = await newEvent.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);
  
// @route    GET api/events landing no auth
// @desc     Get all events
// @access   Private
router.get('/guest', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

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

// @route    post api/events/event/:id
// @desc     update events 
// @access   Private
router.put(
    '/event/:id',
    auth,
    checkObjectId('id'),
    check('title', 'Title is required').notEmpty(),
    check('location', 'Location is required').notEmpty(),
    check('start', 'Start date is required and needs to be from the past').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const event = await Event.findById(req.params.id);
        const user = await User.findById(req.user.id).select('-password');
        const { title, description, note, location, start, end, status }= req.body;

        const updateEvent = {
            user: req.user.id,
            title: title,
            name: user.name,
            avatar: user.avatar,
            description: description,
            note: note,
            location: location,
            start: start,
            end: end,
            status: status,
            edited: Date.now(),
            date: event.date
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

// @route    DELETE api/events/event/:id
// @desc     Delete a event
// @access   Private
router.delete('/event/:id', [auth, checkObjectId('id')], async (req, res) => {
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

// @route    POST api/events/item/:id
// @desc     Add events item
// @access   Private
router.post(
    '/item/:id',
    auth,
    checkObjectId('id'),
    check('name_item', 'Item name is required').notEmpty(),
    check('type', 'Type is required').notEmpty(),
    check('quantity', 'Quantity is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            const user = await User.findById(req.user.id).select('-password');
            const event = await Event.findById(req.params.id);
            const { name_item, fa, brand, type, quantity } = req.body;

            const newItem = {
                user: req.user.id,
                name: user.name,
                name_item: name_item,
                fa: fa,
                brand: brand,
                type: type,
                quantity: quantity,
            };

            event.items.unshift(newItem);

            await event.save();

            res.json(event.items);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/events/item/:id/:item_id
// @desc     Delete item
// @access   Private
router.delete('/item/:id/:item_id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
    
        // Pull out item
        const item = event.items.find(
            (item) => item.id === req.params.item_id
        );

        // Make sure item exists
        if (!item) {
            return res.status(404).json({ msg: 'Item does not exist' });
        }
        
        // Check user
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
    
        event.items = event.items.filter(
            ({ id }) => id !== req.params.item_id
        );
    
        await event.save();
    
        return res.json(event.items);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route    POST api/events/support/:id
// @desc     Add events support
// @access   Private
router.post(
    '/support/:id',
    auth,
    checkObjectId('id'),
    check('name_support', 'Name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            const user = await User.findById(req.user.id).select('-password');
            const event = await Event.findById(req.params.id);

            // Check if the onduty has already been supported
            // if (event.supports.some((support) => support.name_support.toString() === req.body.name_support)) {
            //     return res.status(400).json({ msg: 'He already exists' });
            // }

            const newSupport = {
                user: req.user.id,
                name: user.name,
                name_support: req.body.name_support
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
            return res.status(401).json({ msg: 'User not authorized' });
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