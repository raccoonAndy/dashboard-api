import { App } from './app';
import { ErrorFilters } from './errors/error.filters';
import { LoggerService } from './logger/logger.service';
import UserController from './users/users.controller';

async function main() {
  const logger = new LoggerService();
  const app = new App(logger, new UserController(logger), new ErrorFilters(logger));
  app.init();
}

main();
