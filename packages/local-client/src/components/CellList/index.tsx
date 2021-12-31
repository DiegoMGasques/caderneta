import React, { Fragment, useEffect } from "react";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "../../hooks/use-selector.hook";
import AddCell from "../AddCell";
import CellListItem from "./CellListItem";

import "./style.css";

const CellList: React.FC = () => {
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const cells = useSelector(({ cells }) => {
    if (!cells) return [];
    return cells.order.map((id) => cells.data[id]);
  });

  return (
    <div className="cell-list">
      <AddCell forceVisibility={cells.length === 0} prevCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell prevCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
