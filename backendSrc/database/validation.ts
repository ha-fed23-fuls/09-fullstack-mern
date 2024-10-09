// import { WithId } from "mongodb";
import { AnimalFact } from "../models/AnimalFact";

function isValidFact(fact: AnimalFact): boolean {
	// kontrollera att fact är ett komplett och riktigt AnimalFact objekt
	// TODO: lägg till validering
	return fact === fact
}

export { isValidFact }
