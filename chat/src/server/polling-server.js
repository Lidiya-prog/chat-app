const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json())

let messages = [];
const variants = ['Hello', 'Why?', 'How are you?', 'What happened?', 'Are you busy?']

function getRandomArbitrary (min = 0, max = 4) {
  return Math.floor(Math.random() * (max - min) + min)
}

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const { text } = req.body;
  messages.push({ text });
  res.sendStatus(200);
});

module.exports = app
