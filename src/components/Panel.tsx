import { useState } from 'react';
import { bundle } from '../bundle';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

import Resizable from './Resizable';
const Panel = () => {
	const [code, setCode] = useState<string>('');

	const handleChange = async (value: string | undefined) => {
		const result = (await bundle(value!)) as string;
		setCode(result);
	};

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor onChange={handleChange} />
				</Resizable>
				<Preview code={code} />
			</div>
		</Resizable>
	);
};

export default Panel;
