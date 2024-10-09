// Importera och konfigurera
import express, { Express } from 'express'
import { router as animalFactsRouter } from './routes/animalFacts.js'
const app: Express = express()
const port: number = Number(process.env.PORT || 4242)


// Middleware
app.use('/', express.static('dist/'))

// Router middleware
app.use('/api/animal-facts', animalFactsRouter)


// Eventuella routes


// Starta servern
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
