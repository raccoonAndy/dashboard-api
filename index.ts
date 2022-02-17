import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';

const port = 8080;
const app = express();

// Middleware steps
// GET ->
// Implement all global app.use() ->
// Implement all sub routers (if consist) router.use() ->
// Implement particular router.get('/route', [cb1, cb2, ...]) ->
// Implement error handler app.use((err, ...)) ->
// Return response

// callback handler global router (for all app)
app.use((req, res, next) => {
  console.log(`Time enter: ${Date.now()}`);
  next();
});

app.get('/hello', (req, res) => {
  throw new Error('Error!');
});

app.use('/users', userRouter);

// ! handler error must be at the end after all .use()
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message);
  res.status(401).send(error.message);
});

app.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`);
});
