import { DuplicatedValueError } from "../../src/errors/duplicated-value-error"
import { InvalidEntryError } from "../../src/errors/invalid-entry-error"
import { InvalidSpotError } from "../../src/errors/invalid-spot-error"
import { Board } from "../../src/game/board"
import { BoardChecker } from "../../src/validators/board-checker"
import { EntrySpotValidator } from "../../src/validators/entry-spot-validator"
import { EntryValueValidator } from "../../src/validators/entry-value-validator"

const makeBoard = (): Board => {
    const entryValueValidator = new EntryValueValidator()
    const entrySpotValidator = new EntrySpotValidator()
    const boardChecker = new BoardChecker()

    return new Board(entryValueValidator, entrySpotValidator, boardChecker)
}

const getFakeInput = (fakeValue?: number, fakeSpot?: number[]) => ({
    value: fakeValue || 1,
    spot: fakeSpot || [0, 8]
})

describe('Board', () => { 
    describe('Board.move', () => {
        it('Should throws InvalidEntryError when user inserts a number lower than one', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(-1)

            expect(() => board.move(input, starterBoard)).toThrow(new InvalidEntryError)
        })

        it('Should throws InvalidEntryError when user inserts a number higher than nine', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(10)

            expect(() => board.move(input, starterBoard)).toThrow(new InvalidEntryError)
        })

        it('Should throws InvalidSpotError when first number in the position is lower than zero', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(2, [-1, 2])
            
            expect(() => board.move(input, starterBoard)).toThrow(new InvalidSpotError)
        })

        it('Should throws InvalidSpotError when first number in the position is higher than 8', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(2, [9, 2])
            
            expect(() => board.move(input, starterBoard)).toThrow(new InvalidSpotError)
        })

        it('Should throws InvalidSpotError when second number in the position is lower than zero', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(2, [1, -1])
            
            expect(() => board.move(input, starterBoard)).toThrow(new InvalidSpotError)
        })

        it('Should throws InvalidSpotError when second number in the position is higher than 8', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(2, [1, 9])
            
            expect(() => board.move(input, starterBoard)).toThrow(new InvalidSpotError)
        })

        it('Should throws InvalidSpotError when position has only one value', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(2, [1])
            
            expect(() => board.move(input, starterBoard)).toThrow(new InvalidSpotError)
        })

        it('Should throws InvalidSpotError when position has more than 2 values', () => {
            const board = makeBoard()
            const starterBoard = board.start()
            const input = getFakeInput(2, [1, 2, 3])
            
            expect(() => board.move(input, starterBoard)).toThrow(new InvalidSpotError)
        })

        it('Should throws DuplicatedValueError when the input already exists in a row', () => {
            const board = makeBoard()
            const firstInput = getFakeInput(2, [1, 2])
            const input = getFakeInput(2, [1, 2])

            const starterBoard = board.start()

            board.move(firstInput, starterBoard)
            
            expect(() => board.move(input, starterBoard)).toThrow(new DuplicatedValueError)
        })

        it('Should throws DuplicatedValueError when the input already exists in a row', () => {
            const board = makeBoard()
            const firstInput = getFakeInput(2, [1, 2])
            const input = getFakeInput(2, [1, 4])

            const starterBoard = board.start()

            board.move(firstInput, starterBoard)
            
            expect(() => board.move(input, starterBoard)).toThrow(new DuplicatedValueError)
        })

        it('Should throws DuplicatedValueError when the input already exists in a column', () => {
            const board = makeBoard()
            const firstInput = getFakeInput(2, [5, 7])
            const input = getFakeInput(2, [1, 7])

            const starterBoard = board.start()

            board.move(firstInput, starterBoard)
            
            expect(() => board.move(input, starterBoard)).toThrow(new DuplicatedValueError)
        })

        it('Should returns winner:false when there is still 0 in the board', () => {
            const board = makeBoard()
            const firstInput = getFakeInput(2, [5, 7])

            const starterBoard = board.start()

            const currentBoard = board.move(firstInput, starterBoard)

            expect(currentBoard.winner).toBe(false)
        })

        it('Should returns winner:true when all values are in place', () => {
            const starterBoard = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [2, 3, 4, 5, 6, 7, 8, 9, 1],
                [3, 4, 5, 6, 7, 8, 9, 1, 2],
                [4, 5, 6, 7, 8, 9, 1, 2, 3],
                [5, 6, 7, 8, 9, 1, 2, 3, 4],
                [6, 7, 8, 9, 1, 2, 3, 4, 5],
                [7, 8, 9, 1, 2, 3, 4, 5, 6],
                [8, 9, 1, 2, 3, 4, 5, 6, 7],
                [9, 1, 2, 3, 4, 5, 6, 7, 0],
            ]

            const board = makeBoard()
            const testBoard = board.start(starterBoard)

            const lastInput = getFakeInput(8, [8, 8])
            const currentBoard = board.move(lastInput, testBoard)

            const expectedBoard = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [2, 3, 4, 5, 6, 7, 8, 9, 1],
                [3, 4, 5, 6, 7, 8, 9, 1, 2],
                [4, 5, 6, 7, 8, 9, 1, 2, 3],
                [5, 6, 7, 8, 9, 1, 2, 3, 4],
                [6, 7, 8, 9, 1, 2, 3, 4, 5],
                [7, 8, 9, 1, 2, 3, 4, 5, 6],
                [8, 9, 1, 2, 3, 4, 5, 6, 7],
                [9, 1, 2, 3, 4, 5, 6, 7, 8],
            ]

            expect(currentBoard.winner).toBe(true)
            expect(currentBoard.board).toEqual(expectedBoard)
        })
    })

    describe('Board.get', () => {
        it('Should return the current board after each move', () => {
            const board = makeBoard()
            const testBoard = board.start()

            const firstInput = getFakeInput(2, [0, 0])
            const secodnInput = getFakeInput(2, [8, 8])

            board.move(firstInput, testBoard)
            board.move(secodnInput, testBoard)

            const currentBoard = board.get()

            expect(currentBoard.board).toEqual([
                [2, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 2],
            ])
        })

        it('Should returns winner:true when all values are in place', () => {
            const starterBoard = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [2, 3, 4, 5, 6, 7, 8, 9, 1],
                [3, 4, 5, 6, 7, 8, 9, 1, 2],
                [4, 5, 6, 7, 8, 9, 1, 2, 3],
                [5, 6, 7, 8, 9, 1, 2, 3, 4],
                [6, 7, 8, 9, 1, 2, 3, 4, 5],
                [7, 8, 9, 1, 2, 3, 4, 5, 6],
                [8, 9, 1, 2, 3, 4, 5, 6, 7],
                [9, 1, 2, 3, 4, 5, 6, 7, 0],
            ]

            const expectedBoard = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [2, 3, 4, 5, 6, 7, 8, 9, 1],
                [3, 4, 5, 6, 7, 8, 9, 1, 2],
                [4, 5, 6, 7, 8, 9, 1, 2, 3],
                [5, 6, 7, 8, 9, 1, 2, 3, 4],
                [6, 7, 8, 9, 1, 2, 3, 4, 5],
                [7, 8, 9, 1, 2, 3, 4, 5, 6],
                [8, 9, 1, 2, 3, 4, 5, 6, 7],
                [9, 1, 2, 3, 4, 5, 6, 7, 8],
            ]

            const board = makeBoard()
            const testBoard = board.start(starterBoard)

            const lastInput = getFakeInput(8, [8, 8])

            board.move(lastInput, testBoard)

            const currentBoard = board.get()

            expect(currentBoard.winner).toBe(true)
            expect(currentBoard.board).toEqual(expectedBoard)
        })
    })

    describe('Board.start', () => {
        it('Should return the default board', () => {
            const board = makeBoard()
            board.start()

            const currentBoard = board.get()

            expect(currentBoard.board).toEqual([
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
            ])
        })

        it('Should returns the starter board', () => {
            const starterBoard = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [2, 3, 4, 5, 6, 7, 8, 9, 1],
                [3, 4, 5, 6, 7, 8, 9, 1, 2],
                [4, 5, 6, 7, 8, 9, 1, 2, 3],
                [5, 6, 7, 8, 9, 1, 2, 3, 4],
                [6, 7, 8, 9, 1, 2, 3, 4, 5],
                [7, 8, 9, 1, 2, 3, 4, 5, 6],
                [8, 9, 1, 2, 3, 4, 5, 6, 7],
                [9, 1, 2, 3, 4, 5, 6, 7, 0],
            ]

            const board = makeBoard()
            board.start(starterBoard)
            
            const currentBoard = board.get()

            expect(currentBoard.winner).toBe(false)
            expect(currentBoard.board).toEqual(starterBoard)
        })
    })
 })