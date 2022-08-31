export class InvalidUndoError extends Error {
    public static readonly Msg = 'It is not possible to undo this move';

    constructor() {
        super(InvalidUndoError.Msg);
    }
}