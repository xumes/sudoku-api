import { Validator } from "../interfaces/validator-interface";

export class DuplicatedValueValidator {
    exists(value: number, position: number[], currentBoard: number[][]): boolean {
        if (currentBoard[position[0]].includes(value)) {
            return true
        }

        for (let index=0; index<currentBoard.length; index++) {
            if (currentBoard[index][position[1]] === value ) {
                return true
            }
        }

        return false
    }
}