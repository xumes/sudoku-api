import { Request, Response, Router } from 'express';
import {createClient} from 'redis';
import { HttpStatusCode } from '../http/http-helper';
import { BoardService } from '../services/board-service';

const router = Router();

const client = createClient({
    url: "redis://redis"
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

router.get('/', async (req: Request, res: Response) => {
    const sessionId = req.sessionID
    const value = await client.get(sessionId) || "";

    if (!value) {
        res.json({"status": "There is no active game, please start one"})
        return
    }

    res.json({"status": JSON.parse(value)})
})

router.post('/', async (req: Request, res: Response) => {
    const sessionId = req.sessionID

    const boardService = new BoardService()
    const initialBoard = boardService.startGame()
    
    await client.set(sessionId, JSON.stringify(initialBoard));

    res.status(HttpStatusCode.CREATED).json(initialBoard)
})

export default router;