import { DuplicatedValueError } from "../errors/duplicated-value-error"
import { GameWinnerError } from "../errors/game-winner-error"
import { InvalidEntryError } from "../errors/invalid-entry-error"
import { InvalidSpotError } from "../errors/invalid-spot-error"
import { InvalidUndoError } from "../errors/invalid-undo-error"
import { SpotOccupiedError } from "../errors/spot-occupied-error"
import { CurrentBoardModel } from "../models/current-board-model"
import { boardInputModel } from "../models/game-input-model"
import { BoardChecker } from "../validators/board-checker"
import { EntrySpotValidator } from "../validators/entry-spot-validator"
import { EntryValueValidator } from "../validators/entry-value-validator"

export class Board {
    private entryValidator: EntryValueValidator
    private spotValidator: EntrySpotValidator
    private boardChecker: BoardChecker
    private playerBoard: string[]

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

    start = (starterBoard?: string[]): CurrentBoardModel => {
        this.playerBoard = starterBoard || this.resetPlayerBoard()

        return {
            winner: false,
            board: this.playerBoard
        }
    }

    move = ( input: boardInputModel, savedBoard: CurrentBoardModel ): CurrentBoardModel => {
        const { value, spot } = input
        const { board, winner } = savedBoard

        if (winner) {
            throw new GameWinnerError()
        }

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

        if ( this.boardChecker.isOccupied(spot, board)) {
            throw new SpotOccupiedError()
        }
        
        board[spot[0]] = this.updateValue(board[spot[0]], spot[1], value)

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

        board[spot[0]] = this.updateValue(board[spot[0]], spot[1], 0)

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

    private updateValue = (row: string, position: number, value: number): string => {
        const rowArray = row.split('')
        rowArray[position] = String(value)
        return rowArray.join('')
    }

    private resetPlayerBoard = (): string[] => {
        return [
            "000000000",
            "000000000",
            "000000000",
            "000000000",
            "000000000",
            "000000000",
            "000000000",
            "000000000",
            "000000000",
        ]
    }
}