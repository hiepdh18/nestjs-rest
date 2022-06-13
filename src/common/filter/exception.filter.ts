import { Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BackendLogger } from './../logger/backend-logger';
const logger = new BackendLogger('Exception');

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any /*, host: ArgumentsHost*/) {
    // const ctx: HttpArgumentsHost = host.switchToHttp();
    // const response: Response = ctx.getResponse();
    this.handleMessage(exception);

    // Response to client
    // AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(exception: any): void {
    let message = 'Internal Server Error';
    // let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        // status = exception.getStatus();
        message = exception.message;
      default:
        message = exception.message;
        break;
    }
    logger.error(message, exception.stack.toString());
  }

  // private static handleResponse(response: Response, exception: any): void {
  //   let responseBody: any = { message: 'Internal server error' };
  //   let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  //   if (exception instanceof HttpException) {
  //     responseBody = exception.getResponse();
  //     statusCode = exception.getStatus();
  //   } else if (exception instanceof Error) {
  //     responseBody = {
  //       statusCode: statusCode,
  //       message: exception.stack,
  //     };
  //   }
  //   response.status(statusCode).json(responseBody);
  // }
}
