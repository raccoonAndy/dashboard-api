import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser: ({ name, email, password }: UserRegisterDTO) => Promise<User | null>;
	validateUser: ({ email, password }: UserLoginDTO) => Promise<boolean>;
}
