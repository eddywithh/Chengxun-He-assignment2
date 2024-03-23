// import React, { useCallback, useRef, useState } from "react";

// const operations = [
//     [0, 1],
//     [0, -1],
//     [1, -1],
//     [-1, 1],
//     [1, 1],
//     [-1, -1],
//     [1, 0],
//     [-1, 0]
// ];

// const generateEmptyGrid = (rows, cols) => {
//     const grid = [];
//     for (let i = 0; i < rows; i++) {
//         grid.push(Array.from(Array(cols), () => 0));
//     }
//     return grid;
// };


// export default function Simulation(){
//     const [gridSize, setGridSize] = useState({ rows: 20, cols: 20 });
//     const [grid, setGrid] = useState(() => generateEmptyGrid(gridSize.rows, gridSize.cols));
//     const [running, setRunning] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [nextStep, setNextStep] = useState(false);

//     const runningRef = useRef();
//     runningRef.current = running;

//     const handleClick = (i, j) => {
//         const newGrid = grid.map((row, rowIndex) =>
//             row.map((col, colIndex) =>
//                 rowIndex === i && colIndex === j ? (grid[rowIndex][colIndex] === 1 ? 0 : 1) : grid[rowIndex][colIndex]
//             )
//         );
//         setGrid(newGrid);
//     };

//     const runSimulation = useCallback(() => {
//         if (!runningRef.current && !nextStep) {
//             return;
//         }

//         setGrid(g => {
//             const newGrid = [];
//             for (let i = 0; i < gridSize.rows; i++) {
//                 const newRow = [];
//                 for (let k = 0; k < gridSize.cols; k++) {
//                     let neighbors = 0;
//                     operations.forEach(([x, y]) => {
//                         const newI = i + x;
//                         const newK = k + y;
//                         if (newI >= 0 && newI < gridSize.rows && newK >= 0 && newK < gridSize.cols) {
//                             neighbors += g[newI][newK];
//                         }
//                     });
//                     if (neighbors < 2 || neighbors > 3) {
//                         newRow.push(0);
//                     } else if (g[i][k] === 0 && neighbors === 3) {
//                         newRow.push(1);
//                     } else {
//                         newRow.push(g[i][k]);
//                     }
//                 }
//                 newGrid.push(newRow);
//             }
//             return newGrid;
//         });

//         if (runningRef.current) {
//             setTimeout(runSimulation, 1000);
//         }
//     }, [gridSize, nextStep]); 

//     const handleSizeChange = (e, type) => {
//         const value = parseInt(e.target.value);
//         setGridSize(prevSize => ({
//             ...prevSize,
//             [type]: value
//         }));
//     };

//     const handleSizeSubmit = () => {
//         if (gridSize.rows < 3 || gridSize.rows > 40 || gridSize.cols < 3 || gridSize.cols > 40) {
//             setErrorMessage("Please enter numbers between 3 and 40.");
//         } else {
//             setGrid(generateEmptyGrid(gridSize.rows, gridSize.cols));
//             setErrorMessage("");
//             if (running) {
//                 setRunning(false);
//                 setTimeout(() => {
//                     setRunning(true);
//                     runSimulation();
//                 }, 1000);
//             }
//         }
//     };

//     const handleNextStep = () => {
//         setNextStep(true);
//         runSimulation();
//     };

//     return (
//         <div className="grid-container">
//             <div>
//                 <input type="number" value={gridSize.rows} onChange={(e) => handleSizeChange(e, "rows")} />
//                 <input type="number" value={gridSize.cols} onChange={(e) => handleSizeChange(e, "cols")} />
//                 <button onClick={handleSizeSubmit}>Submit</button>
//                 {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
//             </div>

//             <button onClick={handleNextStep}>Next</button>

//             <button
//                 onClick={() => {
//                     setRunning(!running);
//                     if (!running) {
//                         runningRef.current = true;
//                         runSimulation();
//                     }
//                 }}
//             >
//                 {running ? "Stop" : "Start"}
//             </button>

//             <button
//                 onClick={() => {
//                     const newGrid = generateEmptyGrid(gridSize.rows, gridSize.cols).map(row =>
//                         row.map(() => (Math.random() > 0.95 ? 1 : 0))
//                     );
//                     setGrid(newGrid);
//                 }}
//             >
//                 Random
//             </button>

//             <button onClick={() => setGrid(generateEmptyGrid(gridSize.rows, gridSize.cols))}>
//                 Clear
//             </button>

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: `repeat(${gridSize.cols}, 20px)`
//                 }}
//             >
//                 {grid.map((rows, i) =>
//                     rows.map((col, j) => (
//                         <div
//                             key={`${i}-${j}`}
//                             onClick={() => handleClick(i, j)}
//                             style={{
//                                 width: 20,
//                                 height: 20,
//                                 backgroundColor: grid[i][j] ? "rgb(150, 150, 228)" : undefined,
//                                 border: "solid 1px black"
//                             }}
//                         />
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };


// import React, { useCallback, useRef, useState } from "react";

// const operations = [
//     [0, 1],
//     [0, -1],
//     [1, -1],
//     [-1, 1],
//     [1, 1],
//     [-1, -1],
//     [1, 0],
//     [-1, 0]
// ];

// const generateEmptyGrid = (rows, cols) => {
//     const grid = [];
//     for (let i = 0; i < rows; i++) {
//         grid.push(Array.from(Array(cols), () => 0));
//     }
//     return grid;
// };


// export default function Simulation(){
//     const [gridSize, setGridSize] = useState({ rows: 20, cols: 20 });
//     const [grid, setGrid] = useState(() => generateEmptyGrid(gridSize.rows, gridSize.cols));
//     const [running, setRunning] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [nextStep, setNextStep] = useState(false);

//     const runningRef = useRef();
//     runningRef.current = running;

//     // 使用 useRef 跟踪输入框的值是否改变
//     const rowsChanged = useRef(false);
//     const colsChanged = useRef(false);

//     const handleClick = (i, j) => {
//         const newGrid = grid.map((row, rowIndex) =>
//             row.map((col, colIndex) =>
//                 rowIndex === i && colIndex === j ? (grid[rowIndex][colIndex] === 1 ? 0 : 1) : grid[rowIndex][colIndex]
//             )
//         );
//         setGrid(newGrid);
//     };

//     const runSimulation = useCallback(() => {
//         if (!runningRef.current && !nextStep) {
//             return;
//         }

//         setGrid(g => {
//             const newGrid = [];
//             for (let i = 0; i < gridSize.rows; i++) {
//                 const newRow = [];
//                 for (let k = 0; k < gridSize.cols; k++) {
//                     let neighbors = 0;
//                     operations.forEach(([x, y]) => {
//                         const newI = i + x;
//                         const newK = k + y;
//                         if (newI >= 0 && newI < gridSize.rows && newK >= 0 && newK < gridSize.cols) {
//                             neighbors += g[newI][newK];
//                         }
//                     });
//                     if (neighbors < 2 || neighbors > 3) {
//                         newRow.push(0);
//                     } else if (g[i][k] === 0 && neighbors === 3) {
//                         newRow.push(1);
//                     } else {
//                         newRow.push(g[i][k]);
//                     }
//                 }
//                 newGrid.push(newRow);
//             }
//             return newGrid;
//         });

//         if (runningRef.current) {
//             setTimeout(runSimulation, 1000);
//         }
//     }, [gridSize, nextStep]); 

//     const handleSizeChange = (e, type) => {
//         const value = parseInt(e.target.value);
//         setGridSize(prevSize => {
//             if (type === "rows") {
//                 rowsChanged.current = true;
//             } else if (type === "cols") {
//                 colsChanged.current = true;
//             }
//             return {
//                 ...prevSize,
//                 [type]: value
//             }
//         });
//     };

//     const handleSizeSubmit = () => {
//         if ((rowsChanged.current || colsChanged.current) && (gridSize.rows >= 3 && gridSize.rows <= 40 && gridSize.cols >= 3 && gridSize.cols <= 40)) {
//             setGrid(generateEmptyGrid(gridSize.rows, gridSize.cols));
//             setErrorMessage("");
//             if (running) {
//                 setRunning(false);
//                 setTimeout(() => {
//                     setRunning(true);
//                     runSimulation();
//                 }, 1000);
//             }
//         } else {
//             setErrorMessage("Please enter numbers between 3 and 40.");
//         }
//         // 重置改变标志
//         rowsChanged.current = false;
//         colsChanged.current = false;
//     };

//     const handleNextStep = () => {
//         setNextStep(true);
//         runSimulation();
//     };

//     return (
//         <div className="grid-container">
//             <div>
//                 <input type="number" value={gridSize.rows} onChange={(e) => handleSizeChange(e, "rows")} />
//                 <input type="number" value={gridSize.cols} onChange={(e) => handleSizeChange(e, "cols")} />
//                 <button onClick={handleSizeSubmit}>Submit</button>
//                 {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
//             </div>

//             <button onClick={handleNextStep}>Next</button>

//             <button
//                 onClick={() => {
//                     setRunning(!running);
//                     if (!running) {
//                         runningRef.current = true;
//                         runSimulation();
//                     }
//                 }}
//             >
//                 {running ? "Stop" : "Start"}
//             </button>

//             <button
//                 onClick={() => {
//                     const newGrid = generateEmptyGrid(gridSize.rows, gridSize.cols).map(row =>
//                         row.map(() => (Math.random() > 0.95 ? 1 : 0))
//                     );
//                     setGrid(newGrid);
//                 }}
//             >
//                 Random
//             </button>

//             <button onClick={() => setGrid(generateEmptyGrid(gridSize.rows, gridSize.cols))}>
//                 Clear
//             </button>

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: `repeat(${gridSize.cols}, 20px)`
//                 }}
//             >
//                 {grid.map((rows, i) =>
//                     rows.map((col, j) => (
//                         <div
//                             key={`${i}-${j}`}
//                             onClick={() => handleClick(i, j)}
//                             style={{
//                                 width: 20,
//                                 height: 20,
//                                 backgroundColor: grid[i][j] ? "rgb(150, 150, 228)" : undefined,
//                                 border: "solid 1px black"
//                             }}
//                         />
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

import React, { useCallback, useRef, useState } from "react";

const numRows = 20;
const numCols = 20;
const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];

const generateEmptyGrid = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push({
                alive: 0,
                lastUpdated: 0
            });
        }
        grid.push(row);
    }
    return grid;
};

export default function Grid() {
    const [grid, setGrid] = useState(() => generateEmptyGrid(numRows, numCols));
    const [running, setRunning] = useState(false);
    const [colorMode, setColorMode] = useState(false);
    const [inputHeight, setInputHeight] = useState('');
    const [inputWidth, setInputWidth] = useState('');
    const [error, setError] = useState('');

    const runningRef = useRef();
    runningRef.current = running;

    const handleClick = (i, j) => {
        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (rowIndex === i && colIndex === j) {
                    return {
                        ...cell,
                        alive: cell.alive === 0 ? 1 : 0,
                        lastUpdated: cell.alive === 0 ? 0 : cell.lastUpdated
                    };
                }
                return cell;
            })
        );
        setGrid(newGrid);
    };

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid(g => {
            const newGrid = g.map((row, i) =>
                row.map((cell, j) => {
                    let neighbors = 0;
                    operations.forEach(([x, y]) => {
                        const newI = i + x;
                        const newJ = j + y;
                        if (newI >= 0 && newI < g.length && newJ >= 0 && newJ < g[0].length) {
                            neighbors += g[newI][newJ].alive;
                        }
                    });

                    if (neighbors < 2 || neighbors > 3) {
                        return { alive: 0, lastUpdated: cell.alive === 0 ? 0 : cell.lastUpdated + 1 };
                    } else if (cell.alive === 0 && neighbors === 3) {
                        return { alive: 1, lastUpdated: 0 };
                    } else {
                        return { ...cell, lastUpdated: cell.alive === 0 ? 0 : Math.min(10, cell.lastUpdated + 1) };
                    }
                })
            );
            return newGrid;
        });

        setTimeout(runSimulation, 1000);
    }, []);

    const handleSizeSubmit = () => {
        const newHeight = parseInt(inputHeight);
        const newWidth = parseInt(inputWidth);

        if (isNaN(newHeight) || isNaN(newWidth) || newHeight < 3 || newHeight > 40 || newWidth < 3 || newWidth > 40) {
            setError('Please enter valid height and width between 3 and 40.');
            return;
        }

        setGrid(generateEmptyGrid(newHeight, newWidth));
        setError('');
    };

    return (
        <>
            <div>
                Height: 
                <input
                    type="number"
                    value={inputHeight}
                    onChange={(e) => setInputHeight(e.target.value)}
                />
                Width:
                <input
                    type="number"
                    value={inputWidth}
                    onChange={(e) => setInputWidth(e.target.value)}
                />
                <button onClick={handleSizeSubmit}>Submit</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>

            <button
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }}
            >
                {running ? "Stop" : "Start"}
            </button>

            <button
                onClick={() => {
                    const rows = [];
                    for (let i = 0; i < numRows; i++) {
                        rows.push(
                            Array.from(Array(numCols), () => ({
                                alive: Math.random() > 0.95 ? 1 : 0,
                                lastUpdated: 0
                            }))
                        );
                    }
                    setGrid(rows);
                }}
            >
                Random
            </button>

            <button
                onClick={() => {
                    setGrid(generateEmptyGrid(numRows, numCols));
                }}
            >
                Clear
            </button>

            <label>
                Color Mode:
                <input
                    type="checkbox"
                    checked={colorMode}
                    onChange={() => setColorMode(!colorMode)}
                />
            </label>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${grid[0].length}, 20px)`
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => handleClick(i, j)}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: colorMode ? (cell.alive === 0 ? `rgba(255,0,0,${Math.min(1, cell.lastUpdated / 10)})` : "pink") : (cell.alive === 0 ? "rgba(255,0,0,0)" : "pink"),
                                border: "solid 1px black"
                            }}
                        />
                    ))
                )}
            </div>
        </>
    );
}