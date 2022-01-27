// import next from 'next'

// server.js
const { createServer } = require('http')
const next = require('next')
const routes = require('./router');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)
const handle = app.getRequestHandler()


app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})