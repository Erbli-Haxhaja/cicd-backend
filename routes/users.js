const { body, validationResult } = require('express-validator');
const db = require('../db/db');
const express = require('express');
const router = express.Router();

router.post('/register', 
    body('username').notEmpty().isLength({ max: 255 }),
    body('password').notEmpty().isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Directly store the password without hashing
            const user = await db.models.user.create({
                username: username,
                password: password,  // Store the password as-is
            });

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to register user' });
            console.error('Error registering user:', error);
        }
    }
);

router.post('/login', 
    body('username').notEmpty(),
    body('password').notEmpty(),
    async (req, res) => {
      const { username, password } = req.body;
  
      try {
        const user = await db.models.user.findOne({ where: { username } });
  
        console.log(`Received username: ${username}, Received password: ${password}`);
        console.log(`Stored user:`, user);
  
        if (!user || user.password !== password) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
  
        res.status(200).json({ username: user.username });
      } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
        console.error('Error logging in user:', error);
      }
    }
  );
  

module.exports = router;
