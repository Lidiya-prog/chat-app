const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

let messages = [];
const variants = ['Hello', 'Why?', 'How are you?', 'What happened?', 'Are you busy?']

function getRandomArbitrary (min = 0, max = 4) {
  return Math.floor(Math.random() * (max - min) + min)
}

app.use(express.static(__dirname + '/public'));

app.get('/messages', (req, res) => {
  console.log(messages)
  const lastMessageId = req.query.lastMessageId;
  const newMessages = messages.filter(message => message.id > lastMessageId);
  if (newMessages.length > 0) {
    res.json(newMessages);
  } else {
    setTimeout(() => {
      res.json([]);
    }, 9000); // задержка в 5 секунд для длинного опроса
  }
});

app.post('/messages', (req, res) => {
  const newMessage = req.body;
  // newMessage.id = messages.length + 1;
  messages.push(newMessage);
  res.json(newMessage);
  console.log(newMessage);
  console.log(messages);
});

module.exports = app
