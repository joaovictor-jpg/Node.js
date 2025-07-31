const { Router } = require('express');
const AuthCrontoller = require('../controllers/authController');

const router = Router();

router.post('/login', AuthCrontoller.login);

module.exports = router;