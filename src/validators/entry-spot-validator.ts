import { Validator } from "../interfaces/validator-interface"

export class EntrySpotValidator implements Validator {
    validate(values: number[]): boolean {
        if (values.length !== 2) {
            return false
        }

        const [spot1, spot2] = values

        if (
            spot1 < 0 || spot1 > 8 ||
            spot2 < 0 || spot2 > 8
            ) {
            return false
        }

        return true
    }
}