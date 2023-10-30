import CodeEditor from "./CodeEditor";
import * as esbuild from "esbuild-wasm";
import { useEffect, useCallback, useRef } from "react";
import { unpkgPlugin } from "./plugins/unpkg-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const iframRef = useRef<any>();

  const handleSubmit = async (value: string) => {
    if (!iframRef.current) return;
    iframRef.current.srcdoc = html;
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      target: "esnext",
      color: true,
      write: false,
      plugins: [unpkgPlugin, fetchPlugin(value)],
      define: {
        NODE_ENV: "production",
        global: "window",
      },
    });
    iframRef.current.contentWindow.postMessage(
      result.outputFiles![0].text,
      "*"
    );
  };

  const initialize = useCallback(async () => {
    console.log("calling");
    await esbuild.initialize({
      worker: true,
      wasmURL: "./node_modules/esbuild-wasm/esbuild.wasm",
    });
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      {/* <textarea value={value}  /> */}
      <CodeEditor onChange={handleSubmit as any} />

      <iframe
        allowFullScreen
        ref={iframRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

const html = `
    <html>
    <head></head>
        <body>
          <div id="root"></div>
          <script>
           window.addEventListener("message",event=>{
            try{
                eval(event.data)
            }catch(error){
                const root = document.getElementById("root");
                root.innerText = error;
                root.style.color="red";
            }
           },false)
          </script>
        </body>
    </html>
`;

export default App;
