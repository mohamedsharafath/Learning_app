import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecentFiles.css';

const RecentFiles = ({ setdata }) => {  // Use setdata to match the App component prop
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Fetch files from the server
  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/recentfiles');
      setFiles(response.data);
    } catch (error) {
      console.error("There was an error fetching the files!", error);
      setError("There was an error fetching the files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when the component mounts
  }, []);

  const handleFileClick = (fileUrl) => {
    window.open(fileUrl, '_blank'); // Open the file URL in a new tab
  };

  const HandleStudy = async (fileId) => {
    console.log("File ID clicked:", fileId);
    if (!fileId) {
      console.error("Invalid file ID");
      return;
    }

    try {
      // Fetch the metadata including response data from the server
      const response = await axios.get(`http://127.0.0.1:8000/filemetadata/${fileId}`);
      
      // Extract the response data
      const { response_data } = response.data;
      
      // Pass responseData to setdata function
      setdata(response_data);
      
      // Navigate to Home
      navigate("/home");
    } catch (error) {
      console.error("There was an error fetching the file metadata!", error);
      setError("There was an error fetching the file metadata.");
    }
  };

  return (
    <div className="recent-files-container">
      <h2 className="heading">Recent Files</h2>
      <button onClick={fetchFiles} className="fetch-files-button">
        Refresh Files
      </button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {files.length > 0 ? (
        <ul className="file-list">
          {files.map((file) => (
            <li key={file.id} className="file-item">
              <div className="file-box">
                <button onClick={() => handleFileClick(file.file_url)} className="file-button">
                  {file.filename}
                </button>
                <button onClick={() => HandleStudy(file.id)} className='file-button'>
                  Study
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="no-files">No files found</p>
      )}
    </div>
  );
};

export default RecentFiles;
