export default {
	"*.{js,jsx,ts,tsx,css}": [
		"biome check --no-errors-on-unmatched --files-ignore-unknown=true",
	],
	"*.php": [
		"vendor/bin/pint",
		"vendor/bin/phpstan analyze",
		"vendor/bin/rector process --dry-run",
	],
};
