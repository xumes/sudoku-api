import { DuplicatedValueError } from "../errors/duplicated-value-error"
import { InvalidEntryError } from "../errors/invalid-entry-error"
import { InvalidSpotError } from "../errors/invalid-spot-error"
import { CurrentBoardModel } from "../models/current-board-model"
import { boardInputModel } from "../models/game-input-model"
import { BoardChecker } from "../validators/board-checker"
import { EntrySpotValidator } from "../validators/entry-spot-validator"
import { EntryValueValidator } from "../validators/entry-value-validator"

export class Board {
    private entryValidator: EntryValueValidator
    private spotValidator: EntrySpotValidator
    private boardChecker: BoardChecker
    private playerBoard: number[][]

    constructor(
        entryValidator: EntryValueValidator,
        spotValidator: EntrySpotValidator,
        boardChecker: BoardChecker,
        starterBoard?: number[][]
    ) {
        this.entryValidator = entryValidator
        this.spotValidator = spotValidator
        this.boardChecker = boardChecker
        this.playerBoard = starterBoard || this.resetPlayerBoard()
    }

    move = ( input: boardInputModel ): CurrentBoardModel => {
        const { value } = input
        const { spot } = input

        if (!this.entryValidator.validate(value)) {
            throw new InvalidEntryError()
        }

        if ( !this.spotValidator.validate(spot) ) {
            throw new InvalidSpotError()
        }

        // check for duplicated value in the input row
        if ( this.boardChecker.exists(value, spot, this.playerBoard) ) {
            throw new DuplicatedValueError()
        }

        this.playerBoard[spot[0]][spot[1]] = value
        console.log("has winner?", this.boardChecker.hasWinner(this.playerBoard))

        return {
            winner: this.boardChecker.hasWinner(this.playerBoard),
            board: this.playerBoard
        }
    }

    get = (): CurrentBoardModel => {
        return {
            winner: this.boardChecker.hasWinner(this.playerBoard),
            board: this.playerBoard
        }
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