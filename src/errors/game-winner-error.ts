export class GameWinnerError extends Error {
    public static readonly Msg = 'Hey, it is over, you already won, you can celebrate.';

    constructor() {
        super(GameWinnerError.Msg);
    }
}