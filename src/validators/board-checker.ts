export class BoardChecker {
    exists(value: number, position: number[], currentBoard: string[]): boolean {
        if (currentBoard[position[0]].includes(String(value))) {
            return true
        }

        for (let index=0; index<currentBoard.length; index++) {
            if (currentBoard[index][position[1]] === String(value) ) {
                return true
            }
        }

        return false
    }

    isOccupied(position: number[], currentBoard: string[]): boolean {
        if (currentBoard[position[0]][position[1]] !== String(0)) {
            return true
        }

        return false
    }

    hasWinner(currentBoard: string[]): boolean {
        const boardString = currentBoard.join(",")
        return !boardString.includes("0") && boardString.length > 0
    }
}