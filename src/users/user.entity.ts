import { hash } from 'bcryptjs';

export class User {
	private _password: string | undefined;

	constructor(
		private readonly _name: string | undefined,
		private readonly _email: string | undefined
	) {}

	public get name(): string | undefined {
		return this._name;
	}

	public get email(): string | undefined {
		return this._email;
	}

	public get password(): string | undefined {
		return this._password;
	}

	public async setPassword(pass: string | undefined): Promise<void> {
		if (pass) {
			this._password = await hash(pass, 10);
		}
	}
}
