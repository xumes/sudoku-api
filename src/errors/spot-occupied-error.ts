export class SpotOccupiedError extends Error {
    public static readonly Msg = 'This spot has already a value. If you want to change, clean it first.';

    constructor() {
        super(SpotOccupiedError.Msg);
    }
}