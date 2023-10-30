import Editor from '@monaco-editor/react';
import type { Monaco, EditorProps } from '@monaco-editor/react';
import {
	useState,
	forwardRef,
	useImperativeHandle,
	useRef,
	useMemo,
} from 'react';
import { editor } from 'monaco-editor';
import debounce from 'lodash/debounce';
import prettier from 'prettier';
import parcel from 'prettier/parser-babel';
export type CodeEditorProps = EditorProps & {
	name?: string;
	onChange: (data: string, event?: editor.IModelContentChangedEvent) => void;
	readonly?: boolean;
	onClose?: () => void;
	debounceDelay?: number;
};

type editorRefs = {
	monacoRef: React.Ref<Monaco>;
	editorRef: React.Ref<editor.IStandaloneCodeEditor>;
};

const CodeEditor = forwardRef<editorRefs, CodeEditorProps>(
	(
		{
			height = '45vh',
			defaultLanguage = 'javascript',
			value,
			name,
			readonly = false,
			onChange,
			onClose,
			className,
			debounceDelay = 500,
			...rest
		},
		ref?: React.Ref<editorRefs>,
	) => {
		const [language] = useState(defaultLanguage);
		const [theme] = useState<'light' | 'dark'>('dark');
		const [content, setContent] = useState<string>('');

		const monacoRef = useRef<Monaco | null>(null);
		const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

		function handleEditorDidMount(
			editor: editor.IStandaloneCodeEditor,
			monaco: Monaco,
		) {
			editorRef.current = editor;
			monacoRef.current = monaco;
		}

		const debounceSearch = useMemo(
			() => debounce((value, event) => onChange(value, event), 500),
			[],
		);

		const changeHandler = (
			value: string | undefined,
			ev: editor.IModelContentChangedEvent,
		) => {
			setContent(value!);
			debounceSearch(value, ev);
		};

		useImperativeHandle(ref, () => ({ editorRef, monacoRef }));
		return (
			<div>
				<Editor
					theme={`vs-${theme}`}
					language={language}
					height={height}
					value={content}
					defaultValue="const a  =1;"
					onChange={changeHandler}
					onMount={handleEditorDidMount}
					options={{
						formatOnType: true,
						readOnly: readonly,
						wordWrap: 'on',
						minimap: { enabled: false },
						showUnused: false,
						folding: false,
						lineNumbersMinChars: 3,
						fontSize: 16,
						smoothScrolling: true,
						scrollBeyondLastLine: false,
						automaticLayout: true,
						tabSize: 2,
						formatOnPaste: true,
					}}
					{...rest}
				/>
			</div>
		);
	},
);

export default CodeEditor;
