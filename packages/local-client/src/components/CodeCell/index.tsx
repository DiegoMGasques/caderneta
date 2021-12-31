/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import Editor from "../Editor";
import PreviewWindow from "../PreviewWindow";
import Resizable from "../Resizable";
import { Cell } from "../../store";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "../../hooks/use-selector.hook";
import { useCumulativeCode } from "../../hooks/use-cumulative-code.hook";

import "./style.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useSelector((state) => state.bundles![cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, cell.content, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <Editor
            initialValue={cell.content}
            onChange={(value) => {
              updateCell(cell.id, value);
            }}
          />
        </Resizable>
        <div className="progress-bg">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max={100}>
                Loading
              </progress>
            </div>
          ) : (
            <PreviewWindow code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
