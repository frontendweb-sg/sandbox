import React, { useEffect, useRef } from 'react';
export type PreviewProps = {
	code: string;
};

const html = `
    <html>
      <head>
      <style>
      body{ background-color: white; }
      </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview = ({ code }: PreviewProps) => {
	const iframRef = useRef<any>();

	useEffect(() => {
		//iframRef.current.srcdoc = html;
		iframRef.current.contentWindow.postMessage(code, '*');
	}, [code]);

	return (
		<div className="preview-wrapper">
			<iframe
				width="100%"
				ref={iframRef}
				title="preview"
				sandbox="allow-scripts"
				srcDoc={html}
			/>
		</div>
	);
};

export default Preview;
