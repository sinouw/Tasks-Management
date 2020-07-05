import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();


        return response.status(status).json({
            status: status,
            createdBy: "HttpExceptionFilter",
            errorMessage: exception.message.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }

}