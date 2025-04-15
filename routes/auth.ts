import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { generateAuthToken } from '../middleware/auth';

const router = express.Router();

// Register route
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send('Error registering user');
    }
});

// Login route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send('Invalid credentials');
            return;
        }

        const token = generateAuthToken(user._id.toString());
        res.cookie('auth_token', token, { httpOnly: true });
        res.status(200).send('Login successful');
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});


// Logout route
router.post('/logout', (_req: Request, res: Response) => {
    res.clearCookie('auth_token');
    res.status(200).send('Logged out successfully');
});

export default router;
