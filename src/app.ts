import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import UserController from './users/users.controller';
import { ErrorFilters } from './errors/error.filters';

export class App {
  app: Express;
  server: Server | undefined;
  port: number;
  logger: LoggerService;
  userController: UserController;
  errorFilters: ErrorFilters;

  constructor(
    logger: LoggerService,
    userController: UserController,
    errorFilters: ErrorFilters
  ) {
    this.app = express();
    this.port = 8000;
    this.server = undefined;
    this.logger = logger;
    this.userController = userController;
    this.errorFilters = errorFilters;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useErrorFilters() {
    this.app.use(this.errorFilters.catch.bind(this.errorFilters));
  }

  public async init() {
    this.useRoutes();
    this.useErrorFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}
