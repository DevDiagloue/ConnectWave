import { CustomError } from "./customError";

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof CustomError) {
    return res
      .status(400)
      .send({ errorCode: err.errorCode, message: err.errorMessage });
  }

  res.status(500).send({ message: "Bilinmeyen bir hata oluştu" });
};
