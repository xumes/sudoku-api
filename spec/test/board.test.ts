import { DuplicatedValueError } from "../../src/errors/duplicated-value-error"
import { InvalidEntryError } from "../../src/errors/invalid-entry-error"
import { InvalidSpotError } from "../../src/errors/invalid-spot-error"
import { Board } from "../../src/game/board"
import { DuplicatedValueValidator } from "../../src/validators/duplicated-value-validator"
import { EntrySpotValidator } from "../../src/validators/entry-spot-validator"
import { EntryValueValidator } from "../../src/validators/entry-value-validator"

const makeBoard = (): Board => {
    const entryValueValidator = new EntryValueValidator()
    const entrySpotValidator = new EntrySpotValidator()
    const duplicatedValueValidator = new DuplicatedValueValidator()

    return new Board(entryValueValidator, entrySpotValidator, duplicatedValueValidator)
}

const getFakeInput = (fakeValue?: number, fakeSpot?: number[]) => ({
    value: fakeValue || 1,
    spot: fakeSpot || [0, 8]
})

describe('Board', () => { 
    it('Should throws InvalidEntryError when user inserts a number lower than one', () => {
        const board = makeBoard()
        const input = getFakeInput(-1)

        expect(() => board.move(input)).toThrow(new InvalidEntryError)
    })

    it('Should throws InvalidEntryError when user inserts a number higher than nine', () => {
        const board = makeBoard()
        const input = getFakeInput(10)

        expect(() => board.move(input)).toThrow(new InvalidEntryError)
    })

    it('Should throws InvalidSpotError when first number in the position is lower than zero', () => {
        const board = makeBoard()
        const input = getFakeInput(2, [-1, 2])
        
        expect(() => board.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when first number in the position is higher than 8', () => {
        const board = makeBoard()
        const input = getFakeInput(2, [9, 2])
        
        expect(() => board.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when second number in the position is lower than zero', () => {
        const board = makeBoard()
        const input = getFakeInput(2, [1, -1])
        
        expect(() => board.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when second number in the position is higher than 8', () => {
        const board = makeBoard()
        const input = getFakeInput(2, [1, 9])
        
        expect(() => board.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when position has only one value', () => {
        const board = makeBoard()
        const input = getFakeInput(2, [1])
        
        expect(() => board.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when position has more than 2 values', () => {
        const board = makeBoard()
        const input = getFakeInput(2, [1, 2, 3])
        
        expect(() => board.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws DuplicatedValueError when the input already exists in a row', () => {
        const board = makeBoard()
        const firstInput = getFakeInput(2, [1, 2])
        const input = getFakeInput(2, [1, 2])

        board.move(firstInput)
        
        expect(() => board.move(input)).toThrow(new DuplicatedValueError)
    })

    it('Should throws DuplicatedValueError when the input already exists in a row', () => {
        const board = makeBoard()
        const firstInput = getFakeInput(2, [1, 2])
        const input = getFakeInput(2, [1, 4])

        board.move(firstInput)
        
        expect(() => board.move(input)).toThrow(new DuplicatedValueError)
    })

    it('Should throws DuplicatedValueError when the input already exists in a column', () => {
        const board = makeBoard()
        const firstInput = getFakeInput(2, [5, 7])
        const input = getFakeInput(2, [1, 7])

        board.move(firstInput)
        
        expect(() => board.move(input)).toThrow(new DuplicatedValueError)
    })
 })