import { IsEmail, IsString } from 'class-validator';
export class UserLoginDTO {
	@IsEmail({ message: 'Incorrect email' })
	email: string;

	@IsString({ message: 'Incorrect password' })
	password: string;
}
