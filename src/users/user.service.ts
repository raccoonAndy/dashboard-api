import { injectable } from 'inversify';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
	async createUser({ name, email, password }: UserRegisterDTO): Promise<User | null> {
		const newUser = new User(name, email);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser(): Promise<boolean> {
		return true;
	}
}
