import { OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';

import documentation from './routes/documentation.route';
import userCreate from './routes/user-create.route';

const app = new OpenAPIHono();

userCreate(app);
await documentation(app);

app.onError((error, c) => {
	if (error instanceof HTTPException) {
		console.error({
			cause: error.cause,
			message: error.message,
			name: error.name,
		});

		return error.getResponse();
	}

	console.error(error);

	return c.json(null, 500);
});

export default app;
