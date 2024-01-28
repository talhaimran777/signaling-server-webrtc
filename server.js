import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import Pusher from 'pusher'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
})

app.post('/offer', (req, res) => {
    console.log('Offer Received', req.body.offer)
    pusher.trigger('web-rtc-channel', 'offer', {
        message: req.body.offer,
    })
    res.sendStatus(200)
})

app.post('/answer', (req, res) => {
    pusher.trigger('web-rtc-channel', 'answer', {
        message: req.body.answer,
    })
    res.sendStatus(200)
})

app.post('/ice-candidate', (req, res) => {
    pusher.trigger('web-rtc-channel', 'ice-candidate', {
        message: req.body.iceCandidate,
    })
    res.sendStatus(200)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
