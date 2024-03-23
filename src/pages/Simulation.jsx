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