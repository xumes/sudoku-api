import { DuplicatedValueError } from "../errors/duplicated-value-error"
import { InvalidEntryError } from "../errors/invalid-entry-error"
import { InvalidSpotError } from "../errors/invalid-spot-error"
import { boardInputModel } from "../models/game-input-model"
import { EntrySpotValidator } from "../validators/entry-spot-validator"
import { EntryValueValidator } from "../validators/entry-value-validator"

export class Board {
    private entryValidator: EntryValueValidator
    private spotValidator: EntrySpotValidator
    private playerBoard: number[][]

    constructor(
        entryValidator: EntryValueValidator,
        spotValidator: EntrySpotValidator
    ) {
        this.entryValidator = entryValidator
        this.spotValidator = spotValidator
        this.playerBoard = this.resetPlayerBoard()
    }

    move = ( input: boardInputModel ): void => {
        const { value } = input
        const { spot } = input

        if (!this.entryValidator.validate(value)) {
            throw new InvalidEntryError()
        }

        if ( !this.spotValidator.validate(spot) ) {
            throw new InvalidSpotError()
        }

        // check for duplicated value in the input row
        if (this.playerBoard[spot[0]].includes(value)) {
            throw new DuplicatedValueError()
        }

        //check for duplicated value on the input column
        for (let index=0; index < this.playerBoard.length; index++) {
            if (this.playerBoard[index][spot[1]] === value ) {
                throw new DuplicatedValueError()
            }
        }

        this.playerBoard[spot[0]][spot[1]] = value

    }

    private resetPlayerBoard = (): number[][] => {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    }
}