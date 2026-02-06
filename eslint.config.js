import hexadrop from '@hexadrop/eslint-config';

export default hexadrop({
	files: ['api/**/*.route.ts', 'api/**/src/index.ts'],
	rules: {
		'unicorn/no-null': 'off',
	},
});
