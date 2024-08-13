import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './RecentFiles.css';

const RecentFiles = ({ setdata }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { decode, name } = location.state || {};

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

  const handleStudy = async (fileId) => {
    console.log("File ID clicked:", fileId);
    console.log(decode);
    console.log(name);
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
      navigate("/home", { state: { decode: decode, name: name } });
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
        <div className="file-table">
          {files.map((file) => (
            <div key={file.id} className="file-row">
              <button onClick={() => handleFileClick(file.file_url)} className="file-name">
                {file.filename}
              </button>
              <button onClick={() => handleStudy(file.id)} className="study-button">
                Study
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="no-files">No files found</p>
      )}
    </div>
  );
};

export default RecentFiles;
