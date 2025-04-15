import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { authenticate } from '../middleware/auth';
import User from '../models/user';


const router = express.Router();

// Get user profile
router.get('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.render('profile', { user });  // Pass user to profile.ejs
    } catch (err) {
        res.status(500).send('Error fetching user profile');
    }
});



// Update user profile
router.put('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(req.params.id, { username, password: hashedPassword }, { new: true });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Error updating user profile');
    }
});

// Delete user profile
router.delete('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send('User deleted');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});

export default router;
