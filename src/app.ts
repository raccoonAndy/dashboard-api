import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IErrorHandler } from './errors/error.handler.interface';
import UserController from './users/users.controller';
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

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useErrorHandler() {
    this.app.use(this.errorHandler.catch.bind(this.errorHandler));
  }

  public async init() {
    this.useRoutes();
    this.useErrorHandler();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}
