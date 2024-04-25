import React, { useState } from 'react';

function TwoDArray() {
  const [data, setData] = useState([[1, 2], [3, 4]]); // Initial data

  const appendRow = () => {
    const newData = [...data, Array(data[0].length).fill(0)];
    setData(newData);
  };

  const appendColumn = () => {
    const newData = data.map(row => [...row, 0]);
    setData(newData);
  };

  return (
    <div>
      <h2>2D Array</h2>
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={appendRow}>Add Row</button>
      <button onClick={appendColumn}>Add Column</button>
    </div>
  );
}

export default TwoDArray;
