import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

export const ActiveUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		console.log("ActiveUser decorator called with data:", data);
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);
