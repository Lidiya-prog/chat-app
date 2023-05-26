const consola = require('consola')
// const app = require('express')()

const args = process.argv.slice(2);
const test = args.find(arg => arg.startsWith('--mode=')).split('=')[1];

let mode = 'polling'

if (test === 'long-polling') {
  mode = 'long-polling'
} else if (test === 'ws') {
  mode = 'web-socket'
}

console.log(`Starting server in ${mode} mode...`)

const server = require(`./${mode}-server.js`);

const PORT = 3000

server.listen(PORT, () => {
  consola.ready({
    message: `Server listening on http://localhost:${port}`,
    badge: true
  })
})
