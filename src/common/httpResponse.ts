import { Response } from 'express';

export class HttpResponse {
  //constructor() {}

  /** response from the server */
  async sendResponse(res: Response, b: any, data: any = {}) {
    b.data = data;
    res.status(b.statusCode).json(b);
  }

  async sendErrorResponse(res: Response, b: any, data: any = {}) {
    b.data = data;
    console.log(b);
    res.status(b.statusCode).json(b);
  }
}
