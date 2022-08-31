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
        res.status(HttpStatusCode.NOT_FOUND).json({"message": "There is no active game, please start one"})
        return
    }

    res.status(HttpStatusCode.OK).json(currentBoard)
})

router.post('/', async (req: Request, res: Response) => {
    const sessionId = req.sessionID

    const boardService = new BoardService()
    const initialBoard = boardService.startGame(sessionId)

    await boardService.saveBoard(sessionId, initialBoard)

    res.status(HttpStatusCode.CREATED).json(initialBoard)
})

router.get('/move', async (req:Request, res: Response) => {
    const sessionId = req.sessionID

    const boardService = new BoardService()
    const lastMove = await boardService.getlastMove(sessionId)

    if (!lastMove) {
        res.status(HttpStatusCode.NOT_FOUND).json({"message": "There is no previous move record"})
        return
    }

    res.status(HttpStatusCode.OK).json(lastMove)
})

router.post('/move', async (req: Request, res: Response) => {
    const sessionId = req.sessionID
    if (!req.body) {
        res.status(HttpStatusCode.BAD_REQUEST).end()
        return
    }

    const {value, spot} = req.body
    const input = {value, spot}

    const boardService = new BoardService()

    try {
        const currentBoard = await boardService.move(sessionId, input)

        if (!currentBoard) {
            res.status(HttpStatusCode.NOT_FOUND).json({"message": "There is no active game, please start one"})
            return
        }

        res.status(HttpStatusCode.CREATED).json(currentBoard)
    }
    catch (err) {
        if (err instanceof InvalidEntryError ||
            err instanceof InvalidSpotError ||
            err instanceof DuplicatedValueError
            ) {
            res.status(HttpStatusCode.BAD_REQUEST).json({"message": err.message})
        }
        else {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({err})
        }
    }
})

router.put('/undo', async (req: Request, res: Response) => {
    const sessionId = req.sessionID
})

export default router;