import { Router } from 'express';
import validateForm from '../controllers/validateForm.js';
import { handleLogin, attempLogin, attempRegister } from '../controllers/authContoller.js';
import { rateLimiter } from '../controllers/ratelimiter.js';

const router = Router();

router.route('/login').get(handleLogin).post(validateForm, rateLimiter(60, 10), attempLogin);

router.post('/signup', validateForm, rateLimiter(30, 4), attempRegister);

export default router;
