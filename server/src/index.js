const express = require('express');

const app = express();
const port = 9000;

app.get('/', (req, res) => res.send('Just testing...'));

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
