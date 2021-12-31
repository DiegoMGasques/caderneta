import React from "react";
import { Cell } from "../../../store/cell";
import ActionBar from "../../ActionBar";
import CodeCell from "../../CodeCell";
import TextEditor from "../../TextEditor";

import "./style.css";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const child: JSX.Element =
    cell.type === "code" ? (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
