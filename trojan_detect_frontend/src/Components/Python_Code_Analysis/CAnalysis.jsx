import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Card, CardContent, Typography, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const CAnalysis = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAnalysis = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/analyze-c-code', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            let resultFromPython = response.data.result.split('\n');
            let filteredResult = [];

            for (var i = 0; i < resultFromPython.length; i++) {
                if (
                    resultFromPython[i].includes('Flawfinder version 2.0.19') ||
                    resultFromPython[i].includes('You can inhibit a report by adding a comment in this form') ||
                    resultFromPython[i].includes('// flawfinder: ignore') ||
                    resultFromPython[i].includes("Make *sure* it's a false positive!") ||
                    resultFromPython[i].includes('You can use the option --neverignore to show these.')
                ) {
                    continue;
                } else if (resultFromPython[i].includes('No hits found')) {
                    filteredResult.push('The code does not contain any security threats');
                    filteredResult.push('\n');
                } else {
                    filteredResult.push(resultFromPython[i]);
                    filteredResult.push('\n');
                }
            }

            setResult(filteredResult);
        } catch (error) {
            console.error('Error during analysis:', error);
            alert('An error occurred during analysis. Please try again.');
        }
    };

    const handleDownload = () => {
        if (result) {
            const blob = new Blob([result.join('')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'analysis_result.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh', textAlign: 'center' }}
        >
            <Grid item xs={12} md={3}>
                <Card sx={{ width: '100%', maxWidth: 300, margin: 'auto', p: 2 }}>
                    <CardContent>
                        <Input type="file" onChange={handleFileChange} sx={{ mb: 2 }} />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAnalysis}
                            startIcon={<SaveIcon />}
                            sx={{ mr: 2 }}
                        >
                            Analyze
                        </Button>
                        <Button variant="outlined" color="primary" startIcon={<SaveIcon />} onClick={handleDownload}>
                            Save Result
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            {result && (
                <Grid item xs={12} md={9}>
                    <Card
                        sx={{
                            width: '100%',
                            maxWidth: 900,
                            margin: 'auto',
                            p: 2,
                            maxHeight: 400,
                            overflow: 'auto',
                            textAlign: 'left',
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Analysis Result:
                            </Typography>
                            <pre>{result}</pre>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
};

export default CAnalysis;