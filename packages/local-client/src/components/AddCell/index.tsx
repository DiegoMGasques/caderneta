import React from "react";
import { useActions } from "../../hooks/use-actions";

import "./style.css";

interface AddCellProps {
  prevCellId: string | null;
  forceVisibility?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisibility }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisibility && "visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, "code")}
        >
          <span className="is-small icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(prevCellId, "text")}
        >
          <span className="is-small icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
