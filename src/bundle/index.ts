import * as esbuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPlugin } from './plugins/unpkg-plugin';

let service: boolean = true;
export const bundle = async (value: string) => {
	if (service) {
		await esbuild.initialize({
			worker: true,
			wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
		});
		service = false;
	}

	try {
		const result = await esbuild.build({
			entryPoints: ['index.js'],
			bundle: true,
			target: 'esnext',
			color: true,
			write: false,
			plugins: [unpkgPlugin, fetchPlugin(value)],
			define: {
				NODE_ENV: 'production',
				global: 'window',
			},
		});
		return result.outputFiles[0].text;
	} catch (error) {
		console.log('bundle error', error);
	}
};
