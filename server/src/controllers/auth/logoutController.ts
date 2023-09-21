import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { addTokenToBlacklistService } from '../../services/auth/logoutServices'
import { CustomSuccess } from '../../handler/success/customSuccess'
import { SuccessCodes } from '../../handler/success/successCodes'

const logout = async (req: Request, res: Response) => {
  try {
    const blackListToken = req.cookies.userJWT

    const decodedToken: any = jwt.decode(blackListToken)
    const expireDate = moment.unix(decodedToken.exp).toDate()

    const data = await addTokenToBlacklistService({
      blackListToken,
      expireDate,
    })

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      blackListToken: data.blackListToken,
    })

    return res.clearCookie('userJWT').json(successResponse)
  } catch (error) {
    return res.status(500).json({ error: true, message: error })
  }
}

export default { logout }
