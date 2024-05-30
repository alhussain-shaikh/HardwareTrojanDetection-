import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import { Button, Card, CardContent, Typography } from '@mui/material';

const PythonAnalysis = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleAnalysis = async () => {
        try {
            const response = await axios.post('http://localhost:5000/analyze-python-code', {
                code: code,
            });

            setResult(response.data.result);
        } catch (error) {
            console.error('Error during analysis:', error);
            alert('An error occurred during analysis. Please try again.');
        }
    };

    const handleSaveResult = () => {
        const blob = new Blob([result], { type: 'text/plain' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'python_analysis.txt';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <AceEditor
                mode="python"
                theme="monokai"
                value={code}
                onChange={handleCodeChange}
                name="python_code_editor"
                editorProps={{ $blockScrolling: true }}
                height="300px"
                width="70%"  // Set to 70% of the width
                style={{ margin: '10px' }}  // Add margin if needed
            />
            <Button variant="contained" color="primary" onClick={handleAnalysis} style={{ margin: '10px' }}>
                Analyze
            </Button>
            {result && (
                <>
                <Card variant="outlined" style={{ marginTop: '20px', borderRadius: '50px' }}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Analysis Result
                        </Typography>
                        <pre>{result}</pre>
                    </CardContent>
                </Card>
                <Button variant="contained" color="secondary" onClick={handleSaveResult} style={{ margin: '10px' }}>
                Save Result
            </Button>
                 </>
            )}
        </div>
    );
};

export default PythonAnalysis;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Input } from '@mui/material';

// const PythonCodeAnalysis = () => {
//     const [pythonCode, setPythonCode] = useState('');
//     const [results, setResults] = useState({});

//     const handleCodeChange = (event) => {
//         setPythonCode(event.target.value);
//     };

//     const handleAnalysis = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/analyze-python-code', { code: pythonCode });
//             setResults(response.data);
//         } catch (error) {
//             console.error('Error during analysis:', error);
//             alert('An error occurred during analysis. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <textarea rows="10" cols="50" value={pythonCode} onChange={handleCodeChange} />
//             <Button variant="contained" color="primary" onClick={handleAnalysis}>
//                 Analyze
//             </Button>
//             {results.cprofiler_result && <div><h3>cProfile Result:</h3><pre>{results.cprofiler_result}</pre></div>}
//             {results.mem_result && <div><h3>Memory Profiler Result:</h3><pre>{results.mem_result}</pre></div>}
//             {results.lp_result && <div><h3>Line Profiler Result:</h3><pre>{results.lp_result}</pre></div>}
//         </div>
//     );
// };

// export default PythonCodeAnalysis;