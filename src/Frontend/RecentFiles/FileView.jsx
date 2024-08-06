import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './FileView.css';

const FileView = () => {
  const { fileId } = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileUrl = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/view/${fileId}`, {
          responseType: 'blob' // Ensure the response is treated as binary data
        });
        
        // Create a URL for the file blob
        const fileUrl = URL.createObjectURL(response.data);
        setFileUrl(fileUrl);
      } catch (error) {
        console.error("Error fetching file", error);
        setError("Error fetching file");
      } finally {
        setLoading(false);
      }
    };

    fetchFileUrl();
  }, [fileId]);

  return (
    <div className="file-view-container">
      {loading && <Loader/>}
      {error && <p className="error-message">{error}</p>}
      {fileUrl && (
        <iframe src={fileUrl} className="file-view-frame" title="File Viewer" />
      )}
    </div>
  );
};

export default FileView;
