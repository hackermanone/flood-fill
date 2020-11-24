import produce from 'immer';
import React, { useState, useEffect } from 'react';
import './App.css';
import UserTools from './components/UserTools';

function App() {
  const [settings, setSettings] = useState({
    cellSize: 20,
    numRows: 5,
    numCols: 5,
    color: "#fff",
    tool: "pencil",
  });
  const [grid, setGrid] = useState(() => {
    const rows = [];
    // populate the subarrays with a tuple [color: hexcode string]
    for (let i = 0; i < settings.numRows; i++) {
      rows.push(Array.from(Array(settings.numCols), () => "#fff"))
    }

    return rows;
  });

  useEffect(() => {
    // reset the grid to the new size whenever the settings change

    // newGrid is a 2d array that represents the reset grid with new dimensions with default values
    const newGrid = Array(settings.numRows).fill(Array(settings.numCols).fill('#fff'));
    setGrid(newGrid);
  }, [settings.cellSize, settings.numRows, settings.numCols]);

  /**
   * 
   * @param {string} color The color that will be filled out 
   * @param {number} row Represents the row in the array
   * @param {number} col Represents the column in the arry
   */
  const floodFill = (color: string, row: number, col: number) => {
    setGrid(g => {
      return produce(g, gridCopy => {
        // stack to keep track of the places we need to go next
        let stack = [[row, col]];
        while (stack.length) {
          let data = stack.pop();
          if (data) {
            let row = data[0];
            let col = data[1];

            // validates that the given row and col are within the array bounds
            const isValid = (row: number, col: number) => {
              if (row >= 0 && row < settings.numRows && col >= 0 && col < settings.numCols) {
                return true
              }
            }

            // ignore case where the pixel we are looking at is alreay the colour we want
            if (gridCopy[row][col] === settings.color) {
              continue;
            }

            gridCopy[row][col] = settings.color;

            // Add The 4 cardinal directions to the stack if they are valid
            // Check East
            if (isValid(row + 1, col) && gridCopy[row + 1][col] === color) {
              stack.push([row + 1, col]);
            }
            // Check West
            if (isValid(row - 1, col) && gridCopy[row - 1][col] === color) {
              stack.push([row - 1, col]);
            }
            // CHeck South
            if (isValid(row, col + 1) && gridCopy[row][col + 1] === color) {
              stack.push([row, col + 1]);
            }
            // Check North
            if (isValid(row, col -1) && gridCopy[row][col - 1] === color) {
              stack.push([row, col - 1]);
            }
          }
        }
      })
    })
  }

  const handleClick = (row: number, col: number) => {
    if (settings.tool === 'pencil') {
      // mutates a copy of grid 
      const newGrid = produce(grid, gridCopy => {
        gridCopy[row][col] = settings.color;
      })

      setGrid(newGrid);
    } else if (settings.tool === 'fill') {
      const color = grid[row][col];
      floodFill(color, row, col);
    }
  }

  return (
    <React.Fragment>
      <div className="grid" style={{
        gridTemplateColumns: `repeat(${settings.numCols}, ${settings.cellSize}px)`,
        gridTemplateRows: `repeat(${settings.numRows}, ${settings.cellSize}px)`,
      }}>
        {grid.map((rows, i) => {
            return rows.map((cols, j) => {
              return <div 
                      id={`${i}-${j}`}
                      key={`${i}-${j}`}
                      onClick={() => {
                        handleClick(i, j);
                      }}
                      style={{
                        backgroundColor: grid[i][j],
                        border: "solid 1px black"
                      }}
                      />
            })
          })}
      </div>
      <UserTools settings={settings} setSettings={setSettings}/>
    </React.Fragment>
    
  );
}

export default App;
