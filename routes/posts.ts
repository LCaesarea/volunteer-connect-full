import express, { Request, Response } from 'express';
import Post from '../models/post';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Create a new post
router.get('/create', authenticate, (_req: Request, res: Response) => {
    res.render('create-post');  // Render a new post creation form
});

router.post('/create', authenticate, async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const post = new Post({ title, content });
        await post.save();
        res.redirect('/posts');  // Redirect back to posts list after creation
    } catch (err) {
        res.status(500).send('Error creating post');
    }
});


// Get all posts
router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find();
        res.render('posts', { posts });  // Pass posts to posts.ejs
    } catch (err) {
        res.status(500).send('Error fetching posts');
    }
});



// Update a post
router.put('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Check if title and content are provided
        if (!title || !content) {
            res.status(400).send('Title and content are required');
            return;
        }

        // Find and update the post
        const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!post) {
            res.status(404).send('Post not found');
            return;
        }

        // Send a response (you can send a redirect or success message)
        res.redirect(`/posts/${id}`);  // Redirect to the updated post's page or show a success message
    } catch (err) {
        res.status(500).send('Error updating post');
    }
});


// Delete a post
router.delete('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            res.status(404).send('Post not found');
            return;
        }
        res.status(200).send('Post deleted');
    } catch (err) {
        res.status(500).send('Error deleting post');
    }
});


export default router;
