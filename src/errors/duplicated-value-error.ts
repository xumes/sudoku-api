export class DuplicatedValueError extends Error {
    public static readonly Msg = 'This value already exists this row or column';

    constructor() {
        super(DuplicatedValueError.Msg);
    }
}