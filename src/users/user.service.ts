import { inject, injectable } from 'inversify';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import 'reflect-metadata';
import { IUserRepository } from './user.repository.interface';
import { UserModel } from '@prisma/client';
import { UserLoginDTO } from './dto/user-login.dto';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUserRepository) private userRepository: IUserRepository
	) {}
	async createUser({ name, email, password }: UserRegisterDTO): Promise<UserModel | null> {
		const salt = this.configService.get('SALT');
		const newUser = new User(name, email);
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDTO): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);
		if (!existedUser) return false;
		const user = new User(existedUser.email, existedUser.name, existedUser.password);
		return await user.comparePasswords(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.userRepository.find(email);
	}
}
