const express = require('express')
const path = require('path')
const mediaRoutes = require('./routes/media')
const usersRoutes = require('./routes/users')
const sequelize = require('./utils/database')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/api/media', mediaRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
    res.sendFile('index.html')
})


async function start() {
    try {
        // Перезапись таблицы {force: true}
        await sequelize.sync()
        app.listen(PORT)
    } catch (error) {
        console.log(error)
    }
}

start()


