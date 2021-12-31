import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import "./style.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableBoxProps: ResizableBoxProps;

  const [width, setWidth] = useState(window.innerWidth * 0.75);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);

        if (window.innerWidth * 0.8 < width) {
          setWidth(window.innerWidth * 0.8);
        }
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableBoxProps = {
      className: "resize-horizontal",
      width: width,
      height: Infinity,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.8, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (_e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableBoxProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    };
  }

  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
