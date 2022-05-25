import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoute {
	path: string;
	func: (request: Request, response: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put' | 'patch'>;
}

export type ExpressReturnType = Response<unknown, Record<string, unknown>>;
