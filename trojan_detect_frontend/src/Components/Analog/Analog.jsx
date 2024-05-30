import React, { useState } from 'react';
import Nav from "../Homepage/Nav";

const Analog = () => {
  const [filename, setFilename] = useState('');
  const [RLoadname, setRLoadname] = useState('');
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(10);
  const [numPoints, setNumPoints] = useState(50);
  const [plot, setPlot] = useState(null);

  const handleAnalysis = async () => {
    const response = await fetch('http://localhost:5000/analyze_circuit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        R_loadname: RLoadname,
        start_value: startValue,
        end_value: endValue,
        num_points: numPoints,
      }),
    });

    const result = await response.json();
    setPlot(result.plot);
  };

  return (
    <div>
      <h1>Circuit Analysis App</h1>

      <label>
        Circuit File Name:
        <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
      </label>

      <label>
        Load Resistor Name:
        <input type="text" value={RLoadname} onChange={(e) => setRLoadname(e.target.value)} />
      </label>

      <label>
        Start Value for Load Resistance:
        <input type="number" value={startValue} onChange={(e) => setStartValue(e.target.value)} />
      </label>

      <label>
        End Value for Load Resistance:
        <input type="number" value={endValue} onChange={(e) => setEndValue(e.target.value)} />
      </label>

      <label>
  Number of Points for Load Resistance:
  <input
    type="number"
    value={numPoints}
    onChange={(e) => setNumPoints(parseInt(e.target.value, 10))}
  />
</label>

      <button onClick={handleAnalysis}>Perform Circuit Analysis</button>

      {plot && (
        <div>
          <h2>Power vs Load Resistance</h2>
          <img src={`data:image/png;base64,${plot}`} alt="Power vs Load Resistance" />
        </div>
      )}
    </div>
  );
};

export default Analog;