import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './users.controller.interface';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService
	) {
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
				method: 'post',
				middleware: [new ValidateMiddleware(UserRegisterDTO)],
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDTO>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'Error authorization'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDTO>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		this.loggerService.log('Registered');
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'User not founded'));
		}
		this.ok(res, { email: result.email });
	}
}
