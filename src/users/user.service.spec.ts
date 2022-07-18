import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { UserService } from './user.service';
import { IUserService } from './user.service.interface';

const registerDTOMock = {
	email: 'test@mail.ru',
	password: 'password',
	name: 'John',
};

const loginDTOMock = {
	email: 'test@mail.ru',
	password: 'password',
};

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const userRepositoryMock: IUserRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let userService: IUserService;
let configService: IConfigService;
let userRepository: IUserRepository;

beforeAll(() => {
	container.bind<IUserService>(TYPES.IUserService).to(UserService);
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(configServiceMock);
	container.bind<IUserRepository>(TYPES.IUserRepository).toConstantValue(userRepositoryMock);

	userService = container.get<IUserService>(TYPES.IUserService);
	configService = container.get<IConfigService>(TYPES.IConfigService);
	userRepository = container.get<IUserRepository>(TYPES.IUserRepository);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		userRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				id: 1,
				email: user.email,
				password: user.password,
				name: user.name,
			})
		);
		createdUser = await userService.createUser(registerDTOMock);
		expect(createdUser?.id).toBe(1);
		expect(createdUser?.password).not.toEqual('password');
	});
	it('validateUser: success validate', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await userService.validateUser(loginDTOMock);
		expect(result).toBeTruthy();
	});
	it('validateUser: wrong password', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const result = await userService.validateUser({ ...loginDTOMock, password: 'another' });
		expect(result).toBeFalsy();
	});
	it('validateUser: not found user', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(null);
		const result = await userService.validateUser({ ...loginDTOMock, email: 'another@mail.ru' });
		expect(result).toBeFalsy();
	});
});
