import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FileUpload.css'; 

const FileUpload = ({setfunc}) => {
  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Uploading your document...", { autoClose: false });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setfunc(response.data);
      toast.dismiss(); 
    toast.success("Document Uploaded successfully!");
    } catch (error) {
      toast.dismiss();
    toast.error("There was an error summarizing the document.");
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div className="file-upload-container">
      <h1>Upload a Document to to Practice</h1>
      <form onSubmit={handleSubmit} className="file-upload-form">
        <input type="file" onChange={handleFileChange} required className="file-input"/>
        <button type="submit" disabled={!file} className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
