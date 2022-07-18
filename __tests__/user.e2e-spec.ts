import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

const registerDTOMock = {
	email: 'test@mail.com',
	password: 'password',
	name: 'John',
};

const loginDTOMock = {
	email: 'petr@mail.com',
	password: 'password',
};

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('User E2E', () => {
	it('Register: error', async () => {
		const req = await request(application.app).post('/users/register').send(loginDTOMock);
		expect(req.statusCode).toBe(422);
	});
	it('Login: success', async () => {
		const req = await request(application.app).post('/users/login').send(loginDTOMock);
		expect(req.body.jwt).not.toBeUndefined();
	});
	it('Login: error password', async () => {
		const req = await request(application.app)
			.post('/users/login')
			.send({ ...loginDTOMock, password: 'another' });
		expect(req.statusCode).toBe(401);
	});
	it('Info: success', async () => {
		const login = await request(application.app).post('/users/login').send(loginDTOMock);
		const req = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Baerer ${login.body.jwt}`);
		expect(req.body.email).toBe(loginDTOMock.email);
	});
	it('Info: error', async () => {
		const req = await request(application.app).get('/users/info').set('Authorization', `Baerer 1`);
		expect(req.statusCode).toBe(401);
	});
});

afterAll(() => application.close());
