import { InvalidEntryError } from "../errors/invalid-entry-error"
import { InvalidSpotError } from "../errors/invalid-spot-error"

type boardInput = {
    value: number
    spot: number[]
}

export class Board {
    move = ( input: boardInput ): void => {
        const { value } = input
        const { spot } = input

        if (value < 1 || value > 9) {
            throw new InvalidEntryError()
        }

        if (spot[0] < 0 ) {
            throw new InvalidSpotError()
        }
    }
}