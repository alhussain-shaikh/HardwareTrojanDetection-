import React, { useState } from 'react';
import "./pcb_style.css"

const ImageProcessingForm = () => {
  const [referenceImage, setReferenceImage] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  const [resultImagePath, setResultImagePath] = useState(null);
  const [inputImagePath, setInputImagePath] = useState(null);
  const [referencedImagePath, setReferencedImagePath] = useState(null);
  const [matchingImagePath, setMatchingImagePath] = useState(null);

  const handleReferenceImageChange = (e) => {
    setReferenceImage(e.target.files[0]);
  };

  const handleInputImageChange = (e) => {
    setInputImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('reference_image', referenceImage);
    formData.append('input_image', inputImage);

    try {
      const response = await fetch('http://localhost:5000/process_image', {
        method: 'POST',
        timeout : 100000 ,
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setResultImagePath(result.result_image_path);
        setInputImagePath(result.input_image_path);
        setReferencedImagePath(result.referenced_image_path);
        setMatchingImagePath(result.matching_image_path)
        
      } else {
        console.error('Failed to process images');
      }
    } catch (error) {
      console.error('Error during image processing:', error);
    }
  };

  return (
    <div>
      {/* <h2 className='heading'>Image Processing Form</h2> */}
      <div className='main'>
      <form id="pcbContainer" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="referenceImage">Reference Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleReferenceImageChange}
            required
          />
        </div>
        <div>
          <label htmlFor="inputImage">Input Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleInputImageChange}
            required
          />
        </div>
        <div>
          <button type="submit">Process Images</button>
        </div>
      </form>
      </div>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid red',
      padding: '20px',
      margin: '0 auto'
    }}>
      {resultImagePath !== null ? (
        <>
          <h3>Result Image</h3>
          <img src="http://127.0.0.1:5000/get_result_image" height="600px" width="800px" alt="Result" />
          {console.log(resultImagePath)}
        </>
      ) : (
        <></>
      )}
      {inputImagePath !== null ? (
        <>
          <h3>Input Image</h3>
          <img src="http://127.0.0.1:5000/get_input_image" height="600px" width="800px" alt="Input" />
          {console.log(inputImagePath)}
        </>
      ) : (
        <></>
      )}
      {referencedImagePath !== null ? (
        <>
          <h3>Referenced Image</h3>
          <img src="http://127.0.0.1:5000/get_referenced_image" alt="Referenced" />
          {console.log(referencedImagePath)}
        </>
      ) : (
        <></>
      )}
      {matchingImagePath !== null ? (
        <>
          <h3>Matching Image</h3>
          <img src="http://127.0.0.1:5000/get_matching_image" height="700px" width="900px"  alt="Matching" />
          {console.log(matchingImagePath)}
        </>
      ) : (
        <></>
      )}
    </div>
    </div>
  );
};

export default ImageProcessingForm;