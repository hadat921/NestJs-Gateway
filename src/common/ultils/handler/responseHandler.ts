import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  constructor(private httpService: HttpService) {}

  async successHandler(
    successHttpCode: number,
    successMsg: string,
    successData: any,
  ) {
    return {
      status: successHttpCode,
      message: successMsg,
      data: successData,
    };
  }
}
