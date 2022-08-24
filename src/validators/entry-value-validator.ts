export class EntryValueValidator {
    validate(value: number): boolean {
        if (value < 1 || value > 9) {
            return false
        }

        return true
    }
}