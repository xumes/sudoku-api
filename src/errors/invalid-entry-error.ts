export class InvalidEntryError extends Error {
    public static readonly Msg = 'Value must be a number between 1 and 9';

    constructor() {
        super(InvalidEntryError.Msg);
    }
}