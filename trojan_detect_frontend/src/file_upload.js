import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import html2pdf from 'html2pdf.js';
import './certificate_style.css';
// import badge from 'Badge.jpeg'; 

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [output, setOutput] = useState("");

  const sihUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eqmagpro.com%2Fministry-of-power-advisory-to-ensure-one-nation-one-license-for-electrical-contractors-eqmag%2F&psig=AOvVaw19vo9uvXM9wbRN3FKVUm4p&ust=1703138121809000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNis-42qnYMDFQAAAAAdAAAAABAD";
  const powerUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUChxlM3BMGA2UHJahv-S9cnA&psig=AOvVaw3W976LvaKjyjasR0QTP_3U&ust=1703138094180000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKjsyaqynYMDFQAAAAAdAAAAABAD";
 
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("making post request");
      const response = await axios.post('http://localhost:5000/use_case_1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOutput(response.data);
      console.log("post request completed");
      console.log(response.data);
      alert('Verilog File Uploaded Successfully');

      // Generate and download PDF
      generateAndDownloadPDF(response.data.result);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during file upload. Please try again.');
    } finally {
      setUploading(false); // Set uploading to false regardless of success or failure
    }
  };

  const generateAndDownloadPDF = (dynamicContent) => {
    const content = `
      <div id="certificate">
        <div className="wave"></div>
        <div className='badges' style={{display:'flex'}}>
          <img src=${sihUrl} alt="Badge" className="img2" />
          <img src=${powerUrl} alt="Badge" className="img3" />
          <br /><br />
        </div>
        <div className='content'>
          <h1>Ministry of Power</h1>
          <p>Certificate of Authenticity</p>
          <p>${dynamicContent}</p>
          <p>Head of Organization: Silicon Decrypters</p>
        </div>
      </div>
    `;
  
    const pdfOptions = {
      margin: 10,
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
  
    html2pdf().from(content).set(pdfOptions).save();
  };

  return (
    <Container>
      <Box mt={4}>
        <Card>
          <CardContent>
            <input type="file" onChange={handleFileChange} />
            {file && <p>Selected File: {file.name}</p>}
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            <Typography variant="h6" component="div">
              {output.result}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default FileUpload;
