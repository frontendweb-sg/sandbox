import Editor from "@monaco-editor/react";
import type { Monaco, EditorProps } from "@monaco-editor/react";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { type editor } from "monaco-editor";
import debounce from "lodash/debounce";

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
      height = "45vh",
      defaultLanguage = "javascript",
      value,
      name,
      readonly = false,
      onChange,
      onClose,
      className,
      debounceDelay = 500,
      ...rest
    },
    ref?: React.Ref<editorRefs>
  ) => {
    const [language] = useState(defaultLanguage);
    const [theme] = useState<"light" | "dark">("light");
    const [content, setContent] = useState<string>("");

    const monacoRef = useRef<Monaco | null>(null);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
      editorRef.current = editor;
    }

    const debounceSearch = useMemo(
      () => debounce((value, event) => onChange(value, event), 500),
      []
    );

    const changeHandler = (
      value: string | undefined,
      ev: editor.IModelContentChangedEvent
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
          onChange={changeHandler}
          onMount={handleEditorDidMount}
          options={{
            readOnly: readonly,
          }}
          {...rest}
        />
      </div>
    );
  }
);

export default CodeEditor;
