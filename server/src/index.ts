import express from 'express';

import { listings } from './listings';

const app = express();
const port = 9000;

app.get('/', (_req, res) => res.send('Just testing...'));

app.get('/listings', (_req, res) => {
  return res.send(listings);
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
