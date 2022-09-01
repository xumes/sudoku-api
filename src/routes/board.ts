import { Request, Response, Router } from 'express';
import { DuplicatedValueError } from '../errors/duplicated-value-error';
import { InvalidEntryError } from '../errors/invalid-entry-error';
import { InvalidSpotError } from '../errors/invalid-spot-error';
import { InvalidUndoError } from '../errors/invalid-undo-error';
import { SpotOccupiedError } from '../errors/spot-occupied-error';

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
            err instanceof DuplicatedValueError ||
            err instanceof SpotOccupiedError
            ) {
            res.status(HttpStatusCode.BAD_REQUEST).json({"message": err.message})
        }
        else {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({err})
        }
    }
})

router.put('/move', async (req: Request, res: Response) => {
    const sessionId = req.sessionID

    const boardService = new BoardService()
    const currentBoard = await boardService.undo(sessionId)

    if (!currentBoard) {
        res.status(HttpStatusCode.NOT_FOUND).json({"message": "There is no move to undo"})
        return
    }

    res.status(HttpStatusCode.CREATED).json(currentBoard)
})

router.delete('/move', async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(HttpStatusCode.BAD_REQUEST).end()
        return
    }

    const {value, spot} = req.body
    const input = {value, spot}
    const sessionId = req.sessionID

    const boardService = new BoardService()

    try {
        const currentBoard = await boardService.clean(sessionId, input)

        if (!currentBoard) {
            res.status(HttpStatusCode.NOT_FOUND).json({"message": "There is no active game, please start one"})
            return
        }
    
        res.status(HttpStatusCode.OK).json(currentBoard)
    }
    catch (err) {
        if (err instanceof InvalidUndoError
            ) {
            res.status(HttpStatusCode.BAD_REQUEST).json({"message": "It is not possible to clean this position"})
        }
        else {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({err})
        }
    }
})

export default router;