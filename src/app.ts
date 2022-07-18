import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IErrorHandler } from './errors/error.handler.interface';
import UserController from './users/user.controller';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import 'reflect-metadata';
import { PrismaService } from './database/prisma.service';
import { IUserController } from './users/user.controller.interface';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IErrorHandler) private errorHandler: IErrorHandler,
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
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
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server is running on http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
