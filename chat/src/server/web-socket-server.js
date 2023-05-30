const webSocketServer = require('express')()
const server = require('http').createServer(webSocketServer)
const { Server } = require('socket.io')
const io = new Server(server, {
  autoConnect: false,
  cors: {
    origin: 'http://localhost:8080'
  }
})

const greetVariants = ['hello', 'hi', 'hey']
const answerVariants = ['I don`t understand you, sorry', 'Why?', 'How are you?', 'What happened?', 'Are you busy?']

function getRandomArbitrary (min = 0, max = 4) {
  return Math.floor(Math.random() * (max - min) + min)
}

io.on('connection', (socket) => {
  console.log('a user connected')

  console.log(socket.connected)

  socket.on('createMessage', (data, func) => {
    console.log(data)
    if (!data.text) {
      return func('Текст не может быть пустым')
    }

    io.emit('newMessage', {
      text: data.text,
      owner: data.owner
    })
    func()

    const newMessage = greetVariants.includes(data.text.trim().toLowerCase())
      ? `Hello ${data.name}`
      : answerVariants[getRandomArbitrary()]
    setTimeout(() => {
      socket.emit('newMessage', {
        text: newMessage
      })
    }, 1000)
  })

  socket.on('userJoin', (data, func) => {
    console.log(data)
    if (!data) {
      return func('Имя не может быть пустым')
    }

    func({ userId: socket.id })
    // socket.emit('newMessage', {
    //   text: `Hello ${data}`
    // })
  })
  // socket.on('leftChat', () => {
  //   socket.disconnect()
  // })
})

module.exports = server
