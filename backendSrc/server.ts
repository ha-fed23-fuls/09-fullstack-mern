import express, { Express } from 'express'

const app: Express = express()
const port: number = 4242

app.use('/', express.static('dist/'))





app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
