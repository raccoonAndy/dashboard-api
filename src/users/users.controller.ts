import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserControllers } from './users.controller.interface';
import 'reflect-metadata';

@injectable()
export default class UserController extends BaseController implements IUserControllers {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
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

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Error authorization'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.loggerService.log('Registered');
		this.ok(res, 'Register');
	}
}
