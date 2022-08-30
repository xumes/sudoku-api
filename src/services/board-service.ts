import { makeBoard } from "../factories/board-factory";
import { CurrentBoardModel } from "../models/current-board-model";

export class BoardService {
    startGame (starterBoard?: number[][]): CurrentBoardModel {
        const newBoard = makeBoard()
        return newBoard.start(starterBoard)
    }

    //fairstone: 902-865-6871

}