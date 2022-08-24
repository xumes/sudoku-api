import { InvalidEntryError } from "../errors/invalid-entry-error"
import { InvalidSpotError } from "../errors/invalid-spot-error"
import { EntrySpotValidator } from "../validators/entry-spot-validator"
import { EntryValueValidator } from "../validators/entry-value-validator"

type boardInput = {
    value: number
    spot: number[]
}

export class Board {
    private entryValidator: EntryValueValidator
    private spotValidator: EntrySpotValidator

    constructor(
        entryValidator: EntryValueValidator,
        spotValidator: EntrySpotValidator
    ) {
        this.entryValidator = entryValidator
        this.spotValidator = spotValidator
    }

    move = ( input: boardInput ): void => {
        const { value } = input
        const { spot } = input

        if (!this.entryValidator.validate(value)) {
            throw new InvalidEntryError()
        }

        if ( !this.spotValidator.validate(spot) ) {
            throw new InvalidSpotError()
        }
    }
}