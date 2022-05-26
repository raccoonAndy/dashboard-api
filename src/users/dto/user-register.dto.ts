import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDTO {
	@IsString({ message: 'Incorrect name' })
	name: string | undefined;

	@IsEmail({}, { message: 'Incorrect email' })
	email: string | undefined;

	@IsString({ message: 'Incorrect password' })
	password: string | undefined;
}
