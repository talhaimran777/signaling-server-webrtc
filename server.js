import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})

io.on('connection', (socket) => {
	console.log(`A user connected with socket ID: ${socket.id}`)
})

httpServer.listen(process.env.PORT || 8000, () => {
	console.log('Server is running')
})
