import {createClient, RedisClientType, RedisFunctions, RedisModules, } from 'redis';
import { makeBoard } from "../factories/board-factory";
import { Board } from '../game/board';
import { CurrentBoardModel } from "../models/current-board-model";
import { boardInputModel } from '../models/game-input-model';

export class BoardService {
    private redisClient
    private board: Board
    private expire8Hours: number

    constructor () {
        const client = createClient({
            url: "redis://redis"
        });
        
        client.on('error', (err) => console.log('Redis Client Error', err));
        client.connect();
        this.redisClient = client

        this.expire8Hours = 28800;
        this.board = makeBoard()
    }

    async getBoard (id: string): Promise<CurrentBoardModel|null> {
        const data = await this.redisClient.get(id)

        if (!data) {
            return this.board.get()
        }

        return JSON.parse(data)
    }

    async getlastMove (id: string): Promise<boardInputModel|null> {
        const data = await this.redisClient.get(`${id}:last-move`)

        if (!data) {
            return null
        }

        return JSON.parse(data)
    }

    async saveBoard (id: string, board: CurrentBoardModel): Promise<void> {
        await this.redisClient.set(id, JSON.stringify(board), { 'EX': this.expire8Hours });
    }

    async saveLastMove (id: string, input: boardInputModel): Promise<void> {
        await this.redisClient.set(`${id}:last-move`, JSON.stringify(input), { 'EX': this.expire8Hours });
    }

    startGame (id: string, starterBoard?: number[][]): CurrentBoardModel {
        return this.board.start(starterBoard)
    }

    async move (id: string, input: boardInputModel): Promise<CurrentBoardModel|null> {
        const savedBoard = await this.getBoard(id)

        if (!savedBoard || savedBoard.board.length === 0) {
            return null
        }

        const currentBoard = this.board.move(input, savedBoard)

        if (currentBoard) {
            await this.saveBoard(id, currentBoard)
            await this.saveLastMove(id, input)
        }

        return currentBoard
    }
}