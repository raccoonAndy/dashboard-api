import express from 'express';

const userRouter = express.Router();

userRouter.get('/login', (req, res) => {
  res.send('login');
});

userRouter.post('/register', (req, res) => {
  res.send('register');
});

export { userRouter };
