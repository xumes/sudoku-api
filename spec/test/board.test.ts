import { InvalidEntryError } from "../../src/errors/invalid-entry-error"
import { Board } from "../../src/game/board"

describe('Board', () => { 
    it('Should throws InvalidEntryError when user inserts a number lower than one', () => {

        const input = { value: 0, spot: [1, 2] }

        const board = new Board()
        
        expect(() => board.move(input)).toThrow(new InvalidEntryError)
    })
 })