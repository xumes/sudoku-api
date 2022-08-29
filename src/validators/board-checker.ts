export class BoardChecker {
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

    hasWinner(currentBoard: number[][]): boolean {
        const boardString = currentBoard.join(",")
        return boardString.includes("0")
    }

    private rowLookup(value: number, row: number[]): boolean {
        if (row.includes(value)) {
            return true
        }

        return false
    }
}