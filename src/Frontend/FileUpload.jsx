import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileUpload(file);
  };

  return (
    <div>
      <h1>Upload a Document</h1>
      <input type="file" onChange={handleFileChange} required />
    </div>
  );
};

export default FileUpload;
