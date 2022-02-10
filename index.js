import express from 'express';

const port = 8080;
const app = express();

// It's like middleware between send and handler request
// you can use it for handle errors, for example
// next() — send request next handler (not required)
app.all('/hello', (req, res, next) => {
  console.log("I'm before get handlers");
  next();
});

// extra middleware
const callback = (req, res, next) => {
  console.log("I'm between all and get handlers");
  next(); // go to next request
};

// type route:
// '/hel?lo' — you can route on /hello or /helo
// '/hel+lo' — unlimited numbers `l` after '+'
// '/hel*lo' — unlimited numbers any symbols after '*'
// '/he(la)?lo' — group symbols (/helo, /helalo), like regexp
// '/.*a$/' — you ccan use regexp as well
// you can add extra callbacks (array or one)
app.get('/hello', callback, (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`);
});
