import { useState } from 'react'
import { AnimalFact } from '../data/AnimalFact'

const FactList = () => {
	const [facts, setFacts] = useState<AnimalFact[]>([])

	const handleGetAll = async () => {
		// skicka request med fetch
		// vänta på svar
		// spara svaret i state-variabeln
		const response: Response = await fetch('/api/animal-facts')
		const data = await response.json()
		// console.log('Data från servern: ', data)
		// TODO: om man bedömer att det behövs, kontrollera datan med Joi
		setFacts(data as AnimalFact[])
	}

	return (
		<>
		<button onClick={handleGetAll}> Get all facts! </button>

		{facts.map(fact => (
			<div key={fact._id} className="fact">
				<strong> {fact.score} points - {fact.species} </strong>
				{fact.factoid}
			</div>
		))}
		</>
	)
}

export default FactList
