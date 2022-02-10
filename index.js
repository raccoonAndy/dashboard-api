import express from 'express';

const port = 8080;
const app = express();

// `res.send({ success: true })` — you can send json
// `res.status(201).send({ success: true })` — you can send status
// `res.status(201).json({ success: true })` — you can send json use method json
// `res.download('/test.pdf', 'custom_name.pdf')` — download file
// `res.redirect(301, 'http://other.som')` — redirect to other route
// `res.set('Content-Type', 'text/plain')` — set http headers
// `res.append('Content-Type', 'text/plain')` — add http headers
// `res.type('text/plain')` — force set Content-Type to other type
// `res.location() / res.link` — work with href and links
// `res.cookie('token', 'value', {domain, path, secure, expires})` — work with cookie
// `res.clearCookie('token', {path})` — clear cookie by name
// `res.end()` — finish request (import)
app.get('/hello', (req, res) => {
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`);
});
