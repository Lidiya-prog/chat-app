const consola = require('consola')

const args = process.argv.slice(2);
const test = args.find(arg => arg.startsWith('--mode=')).split('=')[1];

let mode = 'polling'

if (test === 'long-polling') {
  mode = 'long-polling'
} else if (test === 'ws') {
  mode = 'web-socket'
}

consola.ready({
  message: `Starting server in ${mode} mode...`,
  badge: true
})

const server = require(`./${mode}-server.js`);

const PORT = 3000

server.listen(PORT, () => {
  consola.ready({
    message: `Server listening on http://localhost:${PORT}`,
    badge: true
  })
})
