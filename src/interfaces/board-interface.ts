import { boardInputModel } from "../models/game-input-model";

export interface GameInterface {
    move( input: boardInputModel ): void
}