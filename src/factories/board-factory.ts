import { Board } from "../game/board";
import { BoardChecker } from "../validators/board-checker";
import { EntrySpotValidator } from "../validators/entry-spot-validator";
import { EntryValueValidator } from "../validators/entry-value-validator";

export const makeBoard = (): Board => {
    const entryValueValidator = new EntryValueValidator()
    const entrySpotValidator = new EntrySpotValidator()
    const boardChecker = new BoardChecker()

    return new Board(entryValueValidator, entrySpotValidator, boardChecker)
}