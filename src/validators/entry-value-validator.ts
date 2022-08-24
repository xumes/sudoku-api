import { Validator } from "../interfaces/validator-interface"

export class EntryValueValidator implements Validator {
    validate(value: number): boolean {
        if (value < 1 || value > 9) {
            return false
        }

        return true
    }
}