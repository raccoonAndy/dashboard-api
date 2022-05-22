import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { LoggerService } from '../logger/logger.service';

export default class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRouter([
      {
        path: '/login',
        func: this.login,
        method: 'get',
      },
      {
        path: '/register',
        func: this.register,
        method: 'get',
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'Error authorization'));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'Register');
  }
}
