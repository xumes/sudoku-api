export class InvalidSpotError extends Error {
    public static readonly Msg = 'Spot must be a number between 0 and 8';

    constructor() {
        super(InvalidSpotError.Msg);
    }
}