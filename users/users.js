import express from 'express';

const userRouter = express.Router();

// callback handler for particular route
userRouter.use((req, res, next) => {
  console.log('Handle user router');
  next();
});

userRouter.get('/login', (req, res) => {
  res.send('login');
});

userRouter.post('/register', (req, res) => {
  res.send('register');
});

export { userRouter };
