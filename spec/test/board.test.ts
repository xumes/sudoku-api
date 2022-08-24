import { InvalidEntryError } from "../../src/errors/invalid-entry-error"
import { InvalidSpotError } from "../../src/errors/invalid-spot-error"
import { Board } from "../../src/game/board"
import { EntrySpotValidator } from "../../src/validators/entry-spot-validator"
import { EntryValueValidator } from "../../src/validators/entry-value-validator"

type SUTTypes = {
    sut: Board,
}

const makeSUT = (): SUTTypes => {
    const entryValueValidator = new EntryValueValidator()
    const entrySpotValidator = new EntrySpotValidator()
    const board = new Board(entryValueValidator, entrySpotValidator)

    return {
        sut: board
    }
}

const getFakeInput = (fakeValue?: number, fakeSpot?: number[]) => ({
    value: fakeValue || 1,
    spot: fakeSpot || [0, 8]
})

describe('Board', () => { 
    it('Should throws InvalidEntryError when user inserts a number lower than one', () => {
        const { sut } = makeSUT()
        const input = getFakeInput(-1)

        expect(() => sut.move(input)).toThrow(new InvalidEntryError)
    })

    it('Should throws InvalidEntryError when user inserts a number higher than nine', () => {
        const { sut } = makeSUT()
        const input = getFakeInput(10)

        expect(() => sut.move(input)).toThrow(new InvalidEntryError)
    })

    it('Should throws InvalidSpotError when first number in the position is lower than zero', () => {
        const { sut } = makeSUT()
        const input = getFakeInput(2, [-1, 2])
        
        expect(() => sut.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when first number in the position is higher than 8', () => {
        const { sut } = makeSUT()
        const input = getFakeInput(2, [9, 2])
        
        expect(() => sut.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when second number in the position is lower than zero', () => {
        const { sut } = makeSUT()
        const input = getFakeInput(2, [1, -1])
        
        expect(() => sut.move(input)).toThrow(new InvalidSpotError)
    })

    it('Should throws InvalidSpotError when second number in the position is higher than 8', () => {
        const { sut } = makeSUT()
        const input = getFakeInput(2, [1, 9])
        
        expect(() => sut.move(input)).toThrow(new InvalidSpotError)
    })
 })