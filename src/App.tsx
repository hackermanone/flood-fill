import React, { useState } from 'react';
import './App.css';

function App() {
  const [cellSize, setcellSize] = useState(20);
  const [numRows, setNumRows] = useState(30);
  const [numCols, setNumCols] = useState(40);
  const [grid, setGrid] = useState(() => {
    const rows = [];
    // populate the subarrays with a tuple [filled : 1|0, color: hexcode]
    for (let i = 0; i < numRows; i++) {
      rows.push(Array(numCols).fill([0, '#fff']))
    }

    return rows;
  });

  return (
   <div className="grid" style={{
     gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`,
     gridTemplateRows: `repeat(${numRows}, ${cellSize}px)`,
   }}>
    {grid.map((rows, i) => {
        return rows.map((cols, j) => {
          return <div 
                  key={`${i}-${j}`}
                  style={{
                    backgroundColor: grid[i][j][1],
                    border: "solid 1px black"
                  }}
                  />
        })
      })
    }
   </div>
  );
}

export default App;
