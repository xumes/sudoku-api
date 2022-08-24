import { InvalidEntryError } from "../errors/invalid-entry-error"

type boardInput = {
    value: number
    spot: number[]
}

export class Board {
    move = ( input: boardInput ): void => {
        const { value } = input

        if (value < 1 || value > 9) {
            throw new InvalidEntryError()
        }
    }
}