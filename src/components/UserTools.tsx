import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

type Tool = "pencil" | "fill";
type Settings = {cellSize: number, numRows: number, numCols: number, color: string, tool: string}

export default function UserTools(props: { settings: Settings, setSettings: React.Dispatch<React.SetStateAction<Settings>>}) {
  const [currColor, setCurrColor] = useState("#fff");
  const [cellSize, setCellSize] = useState("");
  const [numRows, setNumRows] = useState("");
  const [numCols, setNumCols] = useState("");
  

  const handlePickerChange = (color: ColorResult) => {
    setCurrColor(color.hex);
    props.setSettings({...props.settings, color: color.hex});
  }

  const handleToolChange = (tool: Tool) => {
    props.setSettings({...props.settings, tool});
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setSettings({
      ...props.settings,
      cellSize: parseInt(cellSize),
      numRows: parseInt(numRows),
      numCols: parseInt(numCols)
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          required
          name="cellSize"
          type="number" 
          value={cellSize} 
          onChange={(e) => setCellSize(e.target.value)} 
          placeholder="cell size in px(default 20)"
        />
        <input 
          required
          name="numRows"
          type="number"
          value={numRows}
          onChange={(e) => setNumRows(e.target.value)}
          placeholder="rows (default 30)"
        />
        <input
          required
          name="numCols"
          type="number"
          value={numCols}
          onChange={(e) => setNumCols(e.target.value)}
          placeholder="columns (default 40)"></input>
        <button type="submit">Change Grid</button>
      </form>
      
      <div onClick={() => {handleToolChange("pencil")}}>Paint Tool (Click me!)</div>
      <div onClick={() => {handleToolChange("fill")}}>Fill Tool (Click me!)</div>
      <SketchPicker color={currColor} onChange={handlePickerChange}/>;
    </div>
  )
}
