import express, { Router, Request, Response } from 'express'
import { getFacts, updateFact } from '../database/animalCollection.js'
import { WithId, ObjectId } from 'mongodb'
import { AnimalFact } from '../models/AnimalFact.js'
import { isValidFact } from '../database/validation.js'

const router: Router = express.Router()


// Använd "_" som variabelnamn om en parameter inte används
router.get('/', async (_, res: Response) => {
	const facts: WithId<AnimalFact>[] = await getFacts()
	// Om ett Error kastas kommer Express fånga det och svara med statuskod 500
	res.send(facts)
})

// PUT /api/animal-facts/:id
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
	// validera url-parametern id -> om inte, 400 Bad request
	// validera body -> om felaktig, 400 Bad request
	// om id inte motsvarar något dokument i databasen, 404 Not found
	// skicka update-query till MongoDB Atlas
	// om okej, 204 No content
	// annars, 500 Internal server error
	console.log('PUT 1', req.params.id)

	const id: string = req.params.id
	// TODO: lägg till interface för URL-parametern

	if( !ObjectId.isValid(id) ) {
		res.sendStatus(400)
		return
	}
	console.log('PUT 2')

	const fact: AnimalFact = req.body
	if( !isValidFact(fact) ) {
		res.sendStatus(400)
		return
	}
	console.log('PUT 3', fact)

	const result = await updateFact(id, fact)
	console.log('PUT 3b', result)
	if( result.matchedCount < 1 ) {
		res.sendStatus(404)  // inget animalfact som matchade filtret
		return
	}
	console.log('PUT 4')

	if( result.modifiedCount > 0 ) {
		res.sendStatus(204)
		return
	}
	console.log('PUT 5')

	res.sendStatus(500)
	console.log('PUT 6')
})


export { router }
