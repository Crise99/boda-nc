import eslintPluginAstro from "eslint-plugin-astro"
export default [
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			"eol-last": "off",
			"jsx-quotes": ["warn", "prefer-double"],
			"quotes": ["warn", "double"],
			"semi": ["warn", "never"],
			"@stylistic/js/no-tabs": "off",
			"@stylistic/ts/indent": "off",
			"no-constant-binary-expression": "warn",
			"no-debugger": "warn",
			"no-extend-native": "off",
			"no-trailing-spaces": "warn",
			"space-before-function-paren": "off",
			"antfu/if-newline": "off",
			"antfu/top-level-function": "off",
			"@stylistic/js/operator-linebreak": "off",
			"@stylistic/ts/brace-style": "off",
			"@stylistic/js/multiline-ternary": "off",
			"n/prefer-global/process": "off",
			"@stylistic/js/no-mixed-spaces-and-tabs": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"object-curly-spacing": ["warn", "always"],
			"array-element-newline": ["warn", "consistent"],
			"array-bracket-newline": ["warn", "consistent"],
		}
	}
]
