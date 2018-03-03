const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`server listening on port ${port}`));