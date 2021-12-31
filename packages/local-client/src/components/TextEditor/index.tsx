import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./style.css";
import { Cell } from "../../store";
import { useActions } from "../../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const clickInsideEditor =
        ref.current && e.target && ref.current.contains(e.target as Node);
      if (clickInsideEditor) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || "")}
        />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click here to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
