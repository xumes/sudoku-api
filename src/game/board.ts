import { DuplicatedValueError } from "../errors/duplicated-value-error"
import { InvalidEntryError } from "../errors/invalid-entry-error"
import { InvalidSpotError } from "../errors/invalid-spot-error"
import { InvalidUndoError } from "../errors/invalid-undo-error"
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
    ) {
        this.entryValidator = entryValidator
        this.spotValidator = spotValidator
        this.boardChecker = boardChecker
        this.playerBoard = []
    }

    start = (starterBoard?: number[][]): CurrentBoardModel => {
        this.playerBoard = starterBoard || this.resetPlayerBoard()

        return {
            winner: false,
            board: this.playerBoard
        }
    }

    move = ( input: boardInputModel, savedBoard: CurrentBoardModel ): CurrentBoardModel => {
        const { value, spot } = input
        const { board } = savedBoard

        if (!this.entryValidator.validate(value)) {
            throw new InvalidEntryError()
        }

        if ( !this.spotValidator.validate(spot) ) {
            throw new InvalidSpotError()
        }

        // check for duplicated value in the input row
        if ( this.boardChecker.exists(value, spot, board) ) {
            throw new DuplicatedValueError()
        }

        board[spot[0]][spot[1]] = value

        return {
            winner: this.boardChecker.hasWinner(board),
            board
        }
    }

    undo = (input: boardInputModel, savedBoard: CurrentBoardModel ): CurrentBoardModel => {
        const { value, spot } = input
        const { board } = savedBoard

        //first, check if the movement exists
        if ( !this.boardChecker.exists(value, spot, board) ) {
            throw new InvalidUndoError()
        }

        board[spot[0]][spot[1]] = 0

        return {
            winner: false,
            board
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