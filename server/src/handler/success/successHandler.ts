import { CustomSuccess } from './customSuccess'

export const successHandler = (success: any, req: any, res: any, next: any) => {
  if (success instanceof CustomSuccess) {
    return res
      .status(400)
      .send({
        successCode: success.successCode,
        message: success.successMessage,
      })
  }

  res.status(500).send({ message: 'Bilinmeyen bir hata oluştu' })
}
