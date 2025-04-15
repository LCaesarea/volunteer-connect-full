import express from 'express';

const router = express.Router();

// Render static pages
router.get('/', (_req, res) => {
    res.render('pages/home');
});

router.get('/privacy', (_req, res) => {
    res.render('pages/privacy');
});

router.get('/terms', (_req, res) => {
    res.render('pages/terms');
});

router.get('/donate', (_req, res) => {
    res.render('pages/donate');
});

router.get('/statistics', (_req, res) => {
    res.render('pages/statistics');
});

router.get('/event-planning', (_req, res) => {
    res.render('pages/event-planning');
});

router.get('/events', (_req, res) => {
    res.render('pages/events');
});

router.get('/login', (_req, res) => {
    res.render('pages/login');
});


export default router;
