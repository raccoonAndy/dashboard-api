import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ErrorHandler } from './errors/error.handler';
import { IErrorHandler } from './errors/error.handler.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import UserController from './users/users.controller';
import { IUserController } from './users/users.controller.interface';

interface IBootstrap {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IErrorHandler>(TYPES.IErrorHandler).to(ErrorHandler);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<IUserService>(TYPES.IUserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrap {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
