// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './RecentFiles.css';

// const RecentFiles = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Fetch files from the server
//   const fetchFiles = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/recentfiles');
//       setFiles(response.data);
//       setSelectedFile(null); // Reset selected file when fetching new files
//     } catch (error) {
//       console.error("There was an error fetching the files!", error);
//       setError("There was an error fetching the files.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles(); // Fetch files when the component mounts
//   }, []);

//   const handleFileClick = (file) => {
//     setSelectedFile(file);
//   };

//   return (
//     <div className="recent-files-container">
//       <h2>Recent Files</h2>
//       <button onClick={fetchFiles} className="fetch-files-button">
//         Refresh Files
//       </button>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">{error}</p>}
//       {!selectedFile ? (
//         files.length > 0 ? (
//           <ul className="file-list">
//             {files.map((file) => (
//               <li key={file._id} className="file-item">
//                 <button onClick={() => handleFileClick(file)}>
//                   {file.filename}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           !loading && <p>No files found</p>
//         )
//       ) : (
//         <div className="file-viewer">
//           <button onClick={() => setSelectedFile(null)} className="back-button">
//             Back to File List
//           </button>
//           {/* Display file based on its type */}
//           {selectedFile.filename.endsWith('.jpg') || selectedFile.filename.endsWith('.png') ? (
//             <img 
//               src={selectedFile.file_url} 
//               alt={selectedFile.filename} 
//               style={{ maxWidth: '100%', maxHeight: '400px' }} 
//             />
//           ) : selectedFile.filename.endsWith('.pdf') ? (
//             <iframe 
//               src={selectedFile.file_url} 
//               title={selectedFile.filename}
//               style={{ width: '100%', height: '600px' }} 
//             />
//           ) : (
//             <a href={selectedFile.file_url} target="_blank" rel="noopener noreferrer">
//               {selectedFile.filename}
//             </a>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentFiles.css';

const RecentFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            <li key={file._id} className="file-item">
              <div className="file-box">
                <button onClick={() => handleFileClick(file.file_url)} className="file-button">
                  {file.filename}
                </button>
                <button className='file-button'>Study</button>
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


