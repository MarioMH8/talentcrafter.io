import type { OpenAPIHono } from '@hono/zod-openapi';
import { createRoute, z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';

const ParametersSchema = z.object({
	id: z.ulid().openapi({
		example: '01KGJPPR2ZN959Z3SBNSZXRGCD',
		param: {
			in: 'path',
			name: 'id',
		},
	}),
});

const BodySchema = z
	.object({
		email: z.email().openapi({
			example: 'jhon@talentcrafter.io',
		}),
	})
	.openapi('User');

export default function userCreate(app: OpenAPIHono): void {
	app.openapi(
		createRoute({
			method: 'post',
			path: '/user/{id}',
			request: {
				body: {
					content: {
						'application/json': {
							schema: BodySchema,
						},
					},
				},
				params: ParametersSchema,
			},
			responses: {
				201: {
					description: 'Create user',
				},
			},
			tags: ['User'],
		}),
		_c => {
			/*
			 * const { id } = c.req.valid('param');
			 * const user = c.req.valid('json');
			 */

			throw new HTTPException(401, { message: 'Unauthorized' });

			// return c.body(null, 201);
		},
		(result, c) => {
			if (result.success) {
				return;
			}
			const tree = z.treeifyError(result.error);

			return c.json(tree, 400);
		}
	);
}
