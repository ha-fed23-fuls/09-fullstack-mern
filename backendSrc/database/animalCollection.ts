import { MongoClient, Db, Collection, WithId, UpdateResult, ObjectId } from "mongodb";
import { AnimalFact } from '../models/AnimalFact.js'

// Obs! CONNECTION_STRING hämtas från .env
const con: string | undefined = process.env.CONNECTION_STRING

async function connect(): Promise<[Collection<AnimalFact>, MongoClient]> {
	if( !con ) {
		console.log('No connection string, check your .env file!')
		throw new Error('No connection string')
	}

	const client: MongoClient = await MongoClient.connect(con)
	const db: Db = await client.db('exercises')
	const col: Collection<AnimalFact> = db.collection<AnimalFact>('animalFacts')
	return [col, client]
}

async function getFacts(): Promise<WithId<AnimalFact>[]> {
	const [col, client]: [Collection<AnimalFact>, MongoClient] = await connect()

	const result: WithId<AnimalFact>[] = await col.find({}).toArray()
	await client.close()
	return result
}

// type PURAF = Promise<UpdateResult<AnimalFact>>

async function updateFact(id: string, newFact: AnimalFact): Promise<UpdateResult<AnimalFact>> {
	// TODO: ändra returtyp till något mera passande
	const [col, client]: [Collection<AnimalFact>, MongoClient] = await connect()

	const result: UpdateResult<AnimalFact> = await col.updateOne({ _id: new ObjectId(id) }, { $set: newFact })
	await client.close()
	return result
}


export { getFacts, updateFact }
