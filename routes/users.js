const express = require('express');
const prisma = require('../lib/prisma.cjs');

const router = express.Router();
// routes/users.js
router.get('/', async (req, res) => {
    try {
        const users = await prisma.userSimvai.findMany({
            include: {
                transactions: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(users);
    } catch (err) {
        console.error('Ошибка получения пользователей:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
