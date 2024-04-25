
import React, { useState, useEffect } from 'react';
import './Board.css';

function Board() {
  const [rows, setRows] = useState(0);
 const [columns, setColumns] = useState(0);
  const [rows1, setRows1] = useState(0);
  const [columns1, setColumns1] = useState(0);
  const [showAns, setShowAns] = useState(false);

  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setMatrixA(Array.from({ length: rows }, () => Array.from({ length: columns }, () => 0)));
    setMatrixB(Array.from({ length: rows1 }, () => Array.from({ length: columns1 }, () => 0)));
    setResult(Array.from({ length: rows }, () => Array.from({ length: columns1 }, () => 0)));
  }, [rows, columns, rows1, columns1]);

  function multiplyMatrix(matrix1, matrix2) {
    setShowAns(true);
    const resultMatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
      resultMatrix[i] = [];
      for (let j = 0; j < matrix2[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrix1[0].length; k++) {
          sum += matrix1[i][k] * matrix2[k][j];
        }
        resultMatrix[i][j] = sum;
      }
    }
    setResult(resultMatrix);
  }

  const handleRowChange = (e) => {
    setRows(parseInt(e.target.value));
  };
  const handleRowChange1 = (e) => {
    setRows1(parseInt(e.target.value));
  };

  const handleColumnChange = (e) => {
    setColumns(parseInt(e.target.value));
  };
  const handleColumnChange1 = (e) => {
    setColumns1(parseInt(e.target.value));
  };

  const setData = (e, i, j, matrix) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = parseInt(e.target.value) || 0;
    if (matrix === matrixA) {
      setMatrixA(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  const renderInputs = (matrix, rowsCount, columnsCount) => {
    let inputs = [];
    for (let i = 0; i < rowsCount; i++) {
      for (let j = 0; j < columnsCount; j++) {
        inputs.push(
          <input
            key={`${i}-${j}`}
            type="text"
            onChange={(e) => setData(e, i, j, matrix)}
          />
        );
      }
    }
    return inputs;
  };

  return (
    <>
      <div className='main'>
        Matrix Multiplication
      </div>
      <div className='container'>
        <div className='inputs'>
          <label>Rows:</label>
          <input type="number" value={rows} onChange={handleRowChange} />
        </div>
        <div className='inputs'>
          <label>Columns:</label>
          <input type="number" value={columns} onChange={handleColumnChange} />
        </div>
        <div  style={{
      backgroundColor: 'rgb(165, 197, 228)',
      display: 'grid',
      paddingLeft: '30px',
      marginTop: '20px',
      gridTemplateRows: `repeat(${rows}, 30px)`, // Three rows each with a height of 100px
      gridTemplateColumns: `repeat(${columns}, 30px)`, // Four columns with equal width
      gap: '5px', // Optional gap between grid items
    }}>
          {rows > 0 && columns > 0 ? (
            renderInputs(matrixA, rows, columns)
          ) : (
            <p>Please enter a valid number of rows and columns.</p>
          )}
        </div>
      </div>
      <div className='container'>
        <div className='inputs'>
          <label>Rows:</label>
          <input type="number" value={rows1} onChange={handleRowChange1} />
        </div>
        <div className='inputs'>
          <label>Columns:</label>
          <input type="number" value={columns1} onChange={handleColumnChange1} />
        </div>
        <div  style={{
      backgroundColor: 'rgb(165, 197, 228)',
      display: 'grid',
      paddingLeft: '30px',
      marginTop: '20px',
      gridTemplateRows: `repeat(${rows1}, 30px)`, // Three rows each with a height of 100px
      gridTemplateColumns: `repeat(${columns1}, 30px)`, // Four columns with equal width
      gap: '5px', // Optional gap between grid items
    }}>
        
          {rows1 > 0 && columns1 > 0 ? (
            renderInputs(matrixB, rows1, columns1)
          ) : (
            <p>Please enter a valid number of rows and columns.</p>
          )}
        </div>
      </div>
      <div className='result'>
        <button onClick={() => multiplyMatrix(matrixA, matrixB)}>Calculate</button>
        <div className={showAns ? "show" : "hide"}>
          {result.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => (
                <span key={cellIndex} className="cell">{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Board;
