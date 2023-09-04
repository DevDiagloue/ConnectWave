import { IResult } from '../businessRules/IResult'

const BusinessRules = async (
  ...logics: Array<() => Promise<IResult>>
): Promise<IResult | null> => {
  for (const logicFunc of logics) {
    const logic = await logicFunc()
    // console.log('Logic Result:', logic)
    if (!logic.success) {
      return logic
    }
  }
  return await logics[logics.length - 1]()
}

export default BusinessRules
