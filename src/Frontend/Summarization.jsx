import React from 'react'
import FileUpload from './FileUpload';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Summarization = () => {
    const [file, setFile] = useState(null);

    const handleFileUpload = (uploadedFile) => {
      setFile(uploadedFile);
    };

    const [summary, setSummary] = useState("");

    const handleSummarize = async () => {
      toast.info("Summarizing your document...", { autoClose: false });
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
         
    setSummary(response.data.summary);

    
    toast.dismiss(); 
    toast.success("Document summarized successfully!");

  } catch (error) {
    
    toast.dismiss();
    toast.error("There was an error summarizing the document.");
    console.error("There was an error uploading the file!", error);
  }
    };
  
    return (
      <div>
        <FileUpload onFileUpload={handleFileUpload} />
        <div>
      <button onClick={handleSummarize} disabled={!file}>Summarize</button>
      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
      </div>
    );
}

export default Summarization