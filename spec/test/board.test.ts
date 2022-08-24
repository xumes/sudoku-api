import { InvalidEntryError } from "../../src/errors/invalid-entry-error"
import { InvalidSpotError } from "../../src/errors/invalid-spot-error"
import { Board } from "../../src/game/board"

describe('Board', () => { 
    it('Should throws InvalidEntryError when user inserts a number lower than one', () => {
        const input = { value: 0, spot: [1, 2] }
        const board = new Board()

        expect(() => board.move(input)).toThrow(new InvalidEntryError)
    })

    it('Should throws InvalidEntryError when user inserts a number lower than one', () => {
        const input = { value: 10, spot: [1, 2] }
        const board = new Board()
        
        expect(() => board.move(input)).toThrow(new InvalidEntryError)
    })

    it('Should throws InvalidSpotError when first number in the position is lower than zero', () => {
        const input = { value: 2, spot: [-1, 2] }
        const board = new Board()
        
        expect(() => board.move(input)).toThrow(new InvalidSpotError)
    })
 })