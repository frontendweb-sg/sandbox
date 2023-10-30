import { useEffect, useRef } from 'react';
export type PreviewProps = {
	code: string;
};
const Preview = ({ code }: PreviewProps) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		iframe.current.contentWindow.postMessage(code, '*');
	}, [code]);

	return (
		<div>
			<iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
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

export default Preview;
