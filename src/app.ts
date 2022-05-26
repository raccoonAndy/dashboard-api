import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IErrorHandler } from './errors/error.handler.interface';
import UserController from './users/users.controller';
import { json } from 'body-parser';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server | undefined;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IErrorHandler) private errorHandler: IErrorHandler,
		@inject(TYPES.IUserController) private userController: UserController
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useErrorHandler(): void {
		this.app.use(this.errorHandler.catch.bind(this.errorHandler));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useErrorHandler();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server is running on http://localhost:${this.port}`);
	}
}
