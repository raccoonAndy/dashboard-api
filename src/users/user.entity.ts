import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _name: string,
		private readonly _email: string,
		passwordHash?: string
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	public get name(): string {
		return this._name;
	}

	public get email(): string {
		return this._email;
	}

	public get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		if (pass) {
			this._password = await hash(pass, salt);
		}
	}

	public async comparePasswords(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}
