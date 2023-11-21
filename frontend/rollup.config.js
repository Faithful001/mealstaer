import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";

const extensions = [".js", ".ts"];

const prod = process.env.NODE_ENV == "production";

const browserPlugins = [
	terser({
		output: {
			comments: false,
		},
	}),
];

// Babel configuration
const babelConfig = {
	babelHelpers: "bundled",
	include: ["src/**/*.ts"],
	extensions,
	plugins: ["@babel/plugin-transform-arrow-functions"],
	allowAllFormats: true, // Set allowAllFormats to true
};

const rollupPlugins = [
	resolve({ extensions }),
	commonjs(),
	getBabelOutputPlugin(babelConfig), // Use getBabelOutputPlugin here
];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async () => {
	if (process.env.NODE_ENV == "serve") {
		rollupPlugins.push(serve("dist/bundles"));
	}

	return {
		input: "src/initializer/main.ts",
		output: [
			{
				file: "dist/bundles/main.unminified.js",
				format: "iife",
				name: "cp",
				extend: true,
			},
			{
				file: "dist/bundles/main.js",
				format: "iife",
				name: "cp",
				plugins: [...browserPlugins, getBabelOutputPlugin(babelConfig)], // Include getBabelOutputPlugin here as well
				extend: true,
				sourcemap: true,
			},
		],
		plugins: rollupPlugins,
	};
};
