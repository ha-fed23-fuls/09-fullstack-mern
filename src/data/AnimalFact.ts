// Frontend måste ha en egen modell, vi kan inte importera från backend
export interface AnimalFact {
	_id: string;
	species: string;
	factoid: string;
	score: number;
}
