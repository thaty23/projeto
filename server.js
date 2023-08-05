const express = require('express')
const userRouter = require('./routes')

const app = express()

app.use(express.json())

app.use(userRouter)

app.listen(8080, () => {
    console.log('ok')
})