import express from 'express';
import errorHandler  from './src/utils/error-handler.utils.js';
import membersRouter from './src/modules/members/members.router.js'
import trainersRouter from './src/modules/trainers/trainers.router.js'
import statisticsRouter from './src/modules/statistics/statistics.router.js'
const app = express();

app.use(express.json())

app.use('/members',membersRouter)
app.use('/trainers',trainersRouter)
app.use('/statistics',statisticsRouter)

app.all('*', (req, res, next) => {
    const error = new Error(`Cannot ${req.method} ${req.originalUrl}`)
    error.statusCode = 404
    next(error)
})

app.use(errorHandler)

app.listen(3000, () => {
    console.log("listening on port 3000");
})