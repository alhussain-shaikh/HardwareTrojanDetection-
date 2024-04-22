import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./IPFS.css";
import { useSelector } from 'react-redux';

const IPFS = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [ImgCID,setImgCID] = useState(null);
  const [Name, setName] = useState("");
  const [IC, setIC] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "37a6253a12abb0ec5880",
            pinata_secret_api_key:
              "980387bfe7e066e5bce3d24ff8cbcd356ee9f8dac411b959fd0835cb92689578",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        setImgCID(ImgHash);
        alert("Successfully File Uploaded");
        setFileName("No file selected");
        setFile(null);

        
      } catch (e) {
        alert("Unable to upload file to Pinata");
        console.log(e);
      }
    }

  };

  const post_data = async() => {
    const dataToSend = {
      name: Name,
      ic: IC,
      url: ImgCID,
    }

    console.log("data sending is : ",dataToSend);

    await axios.post('http://localhost:8000/api/addIPFS', dataToSend);
    alert("Data adding to db");
  }

  const retrieveFile = async (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <>
    {/* <h1 style={{textAlign:"center"}} >IPFS System Interaction</h1> */}



      <div class="frame">
      <div className="form_content">
          <label htmlFor="">Enter Corporation Name : </label>
          <input type="text" name="name" id="name" onChange={(e) => {setName(e.target.value)}}/>
          <label htmlFor="">Enter IC Name : </label>
          <input type="text" name="ic" id="ic" onChange={(e) => {setIC(e.target.value)}}/>
      </div>

        <div class="center">
          <div class="title">
            <h1 style={{ fontSize: 30 }}>Drop file to upload</h1>
          </div>

          <form className='form' onSubmit={handleSubmit}>
          <div class="dropzone">
            <img
              src="http://100dayscss.com/codepen/upload.svg"
              class="upload-icon"
            />
            <input type="file" class="upload-input" name="data" onChange={retrieveFile} />
          </div>
          <span className="textArea">File: {fileName}</span><br />
          <button type="submit" class="btn" name="uploadbutton" disabled={!file}>Upload file</button>
          <button onClick={post_data}>Save Result</button>
          </form>
        </div>
      </div> 
      <a id="securityurl" href={ImgCID} target="_blank">
      Access File : {ImgCID==null?"Plz Upload The Image":"Link"}
      </a>
    </>
  );
};



export default IPFS;