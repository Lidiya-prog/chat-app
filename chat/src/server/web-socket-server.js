const webSocketServer = require('express')()
const server = require('http').createServer(webSocketServer)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8081'
  }
})

const variants = ['Hello', 'Why?', 'How are you?', 'What happened?', 'Are you busy?']

function getRandomArbitrary (min = 0, max = 4) {
  return Math.floor(Math.random() * (max - min) + min)
}

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('createMessage', (data, cb) => {
    console.log(data)
    if (!data.text) {
      return cb('Текст не может быть пустым')
    }

    io.emit('newMessage', {
      text: data.text,
      name: data.name
    })
    cb()

    const newMessage = data.text === variants[0] ? variants[2] : variants[getRandomArbitrary()]
    setTimeout(() => {
      socket.emit('newMessage', {
        text: newMessage
      })
    }, 1000)
  })

  socket.on('userJoin', (data, cb) => {
    console.log(data)
    if (!data) {
      return cb('Имя не может быть пустым')
    }

    cb({ userId: socket.id })
    socket.emit('newMessage', {
      text: `Hello ${data}`
    })
  })
  socket.on('leftChat', (cb) => {
    socket.disconnect()
    cb()
    // if (!data) {
    //   return cb('Имя не может быть пустым')
    // }
    //
    // cb({ userId: socket.id })
    // socket.emit('newMessage', {
    //   text: `Hello ${data}`
    // })
  })
})

module.exports = server
