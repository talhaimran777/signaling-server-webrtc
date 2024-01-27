import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
})

io.on('connection', (socket) => {
    console.log(`A new user connected with socket ID: ${socket.id}`)

    socket.on('offer', (offer) => {
        console.log('Offer received on server: ', offer)
        socket.broadcast.emit('offer', offer)
    })

    socket.on('answer', (answer) => {
        console.log('Answer received on server: ', answer)
        socket.broadcast.emit('answer', answer)
    })

    socket.on('ice-candidate', (iceCandidate) => {
        console.log('Ice candidate received on server: ', iceCandidate)
        socket.broadcast.emit('ice-candidate', iceCandidate)
    })
})

httpServer.listen(process.env.PORT || 8000, () => {
    console.log('Server is running')
})
