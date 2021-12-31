import React, { useRef, useEffect } from "react";

import "./style.css";

interface PreviewWindowProps {
  code: string;
  error: string;
}

const html = `
    <html>
      <head>
        <style>
          html { background-color: white; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime error</h4>' + err + '</div>';
            console.error(err);
          } 

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          })

          window.addEventListener('message', e => {
            try {
              eval(e.data);
            } catch(err) {
              handleError(err);
            }
            
          }, false)
        </script>
      </body>
    </html>
  `;

const PreviewWindow: React.FC<PreviewWindowProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    setTimeout(() => {
      if (error) {
        iframe.current.contentWindow.postMessage(
          `(function(){ throw new Error("${error}") })()`,
          "*"
        );
      } else {
        iframe.current.contentWindow.postMessage(code, "*");
      }
    }, 50);
  }, [code, error]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="Preview Window"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default PreviewWindow;
