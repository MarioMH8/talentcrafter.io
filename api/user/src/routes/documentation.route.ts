import { swaggerUI } from '@hono/swagger-ui';
import type { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown';

import packageJson from '../../package.json';

const OPEN_API_VERSION = '3.1.0';

export default async function documentation(app: OpenAPIHono): Promise<void> {
	const content = app.getOpenAPI31Document({
		info: { description: packageJson.description, title: packageJson.name, version: packageJson.version },
		openapi: OPEN_API_VERSION,
	});
	const markdown = await createMarkdownFromOpenApi(JSON.stringify(content));
	app.doc('/doc', {
		info: {
			description: packageJson.description,
			title: packageJson.name,
			version: packageJson.version,
		},
		openapi: OPEN_API_VERSION,
	});

	app.get('/scalar', Scalar({ pageTitle: packageJson.name, url: '/doc' }));
	app.get('/swagger', swaggerUI({ title: packageJson.name, url: '/doc' }));
	app.get('/llms.txt', c => {
		return c.text(markdown);
	});
}
