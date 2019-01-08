const express = require('express');
const path = require('path');

const server = express();

server.use('/dist', express.static(path.resolve(__dirname, 'dist')));

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.listen(4200, () => {
  console.log('Server started on port 4200');
});
