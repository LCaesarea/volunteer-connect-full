import express, { Request, Response } from 'express';
import Event from '../models/event';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Create a new event
router.post('/create', authenticate, async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const event = new Event({ title, description, date });
        await event.save();
        res.status(201).send('Event created successfully');
    } catch (err) {
        res.status(500).send('Error creating event');
    }
});

// Get all events
router.get('/', async (_req, res): Promise<void> => {
    try {
        const events = await Event.find();
        res.render('pages/events', { events }); // Passing events to the EJS view
    } catch (err) {
        res.status(500).send('Error fetching events');
    }
});



// Update an event
router.put('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, date } = req.body;
        const event = await Event.findByIdAndUpdate(
            id,
            { title, description, date },
            { new: true }
        );
        if (!event) {
            res.status(404).send('Event not found');
            return;
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).send('Error updating event');
    }
});

// Delete an event
router.delete('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            res.status(404).send('Event not found');
            return;
        }
        res.status(200).send('Event deleted');
    } catch (err) {
        res.status(500).send('Error deleting event');
    }
});

export default router;
