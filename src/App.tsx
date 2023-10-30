import CodeEditor from './CodeEditor';
import * as esbuild from 'esbuild-wasm';
import { useEffect, useCallback, useRef, useState } from 'react';
import { unpkgPlugin } from './plugins/unpkg-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import Preview from './components/Preview';

const App = () => {
	const [code, setCode] = useState<string>('');

	const handleSubmit = async (value: string) => {
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
		setCode(result.outputFiles[0].text);
	};

	const initialize = useCallback(async () => {
		console.log('calling');
		await esbuild.initialize({
			worker: true,
			wasmURL: './node_modules/esbuild-wasm/esbuild.wasm',
		});
	}, []);

	useEffect(() => {
		initialize();
	}, []);

	return (
		<div>
			{/* <textarea value={value}  /> */}
			<CodeEditor onChange={handleSubmit as any} />
			<Preview code={code} />
		</div>
	);
};

export default App;
