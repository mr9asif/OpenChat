import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  try {
    res.status(data.statusCode).json({
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
