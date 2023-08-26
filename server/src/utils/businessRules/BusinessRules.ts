import { IResult } from "../businessRules/IResult";

const BusinessRules = async (...logics: Array<() => Promise<IResult>>): Promise<IResult | null> => {
    for (const logicFunc of logics) {
        const logic = await logicFunc();
        if (!logic.success) {
            return logic;
        }
    }
    return null;
}

export default BusinessRules;