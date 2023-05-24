const consola = require('consola')
const app = require('express')()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081"
  }
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('createMessage', (data, cb) => {
    console.log(data)
    // if (!data.text) {
    //   return cb('Текст не может быть пустым')
    // }
    //
    // const user = users.get(data.id)
    // if (user) {
    //   io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    // }
    // cb()
  })
})

const port = 3000

server.listen(port, () => {
  consola.ready({
    message: `Server listening on http://localhost:${port}`,
    badge: true
  })
})
