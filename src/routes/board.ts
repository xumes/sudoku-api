import { Request, Response, Router } from 'express';
import { DuplicatedValueError } from '../errors/duplicated-value-error';
import { InvalidEntryError } from '../errors/invalid-entry-error';
import { InvalidSpotError } from '../errors/invalid-spot-error';

import { HttpStatusCode } from '../http/http-helper';
import { BoardService } from '../services/board-service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const sessionId = req.sessionID
    const boardService = new BoardService()
    const currentBoard = await boardService.getBoard(sessionId)

    if (!currentBoard || currentBoard.board.length === 0) {
        res.status(HttpStatusCode.NOT_FOUND).json({"status": "There is no active game, please start one"})
        return
    }

    res.status(HttpStatusCode.OK).json({"status": currentBoard})
})

router.post('/', async (req: Request, res: Response) => {
    const sessionId = req.sessionID

    const boardService = new BoardService()
    const initialBoard = boardService.startGame(sessionId)

    await boardService.saveBoard(sessionId, initialBoard)

    res.status(HttpStatusCode.CREATED).json(initialBoard)
})

router.post('/move', async (req: Request, res: Response) => {
    const sessionId = req.sessionID
    if (!req.body) {
        console.log("erro no body", req.body)
        res.status(HttpStatusCode.BAD_REQUEST).end()
        return
    }

    console.log("este é o body", req.body)
    
    const {value, spot} = req.body
    const input = {value, spot}

    const boardService = new BoardService()

    try {
        const currentBoard = await boardService.move(sessionId, input)

        if (!currentBoard) {
            res.status(HttpStatusCode.NOT_FOUND).json({"status": "There is no active game, please start one"})
            return
        }

        res.status(HttpStatusCode.CREATED).json(currentBoard)
    }
    catch (err) {
        if (err instanceof InvalidEntryError ||
            err instanceof InvalidSpotError ||
            err instanceof DuplicatedValueError
            ) {
            res.status(HttpStatusCode.BAD_REQUEST).json({err})
        }
        else {
            res.status(HttpStatusCode.BAD_REQUEST).json({err})
        }
    }
})

router.put('/undo', async (req: Request, res: Response) => {
    const sessionId = req.sessionID
})

export default router;