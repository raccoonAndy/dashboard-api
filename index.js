import express from 'express';
import { userRouter } from './users/users.js';

const port = 8080;
const app = express();

app.get('/hello', (req, res) => {
  res.send({ success: true });
  res.end();
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`);
});
