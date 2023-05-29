const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())

const messages = []
const greetVariants = ['hello', 'hi', 'hey']
const answerVariants = ['I don`t understand you, sorry', 'Why?', 'How are you?', 'What happened?', 'Are you busy?']

function getRandomArbitrary (min = 0, max = 4) {
  return Math.floor(Math.random() * (max - min) + min)
}

app.get('/messages', (req, res) => {
  const lastMessageId = req.query.lastMessageId
  const newMessages = messages.filter(message => message.id > lastMessageId)

  if (newMessages.length > 0) {
    res.json(newMessages)
  } else {
    setTimeout(() => {
      res.json([])
    }, 5000) // задержка в 5 секунд для длинного опроса
  }
})

app.post('/messages', (req, res) => {
  const newMessage = req.body
  const answerMessage = {
    text: '',
    owner: false
  }

  newMessage.id = messages.length + 1
  messages.push(newMessage)

  if (greetVariants.includes(newMessage.text.trim().toLowerCase())) {
    answerMessage.text = 'Hi, user'
  } else {
    answerMessage.text = answerVariants[getRandomArbitrary()]
  }
  answerMessage.id = messages.length + 1
  messages.push(answerMessage)

  res.sendStatus(200)
})

module.exports = app
