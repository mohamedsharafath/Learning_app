import './App.css';
import Signin from './Components/Signin';
import Home from './Components/Home';
import Summarization from './Frontend/Summarization/Summarization';
import Quiz from './Frontend/Quiz/Quiz';
import FlashCards from './Frontend/FlashCards/FlashCards';
import FileView from './Frontend/RecentFiles/FileView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import RecentFiles from './Frontend/RecentFiles/RecentFiles';

function App() {
  const [responseData, setResponseData] = useState(null);

  const setdata = (data) => {
    setResponseData(data);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        {/* <Route path="/" element={<Home setfunc={setdata}/>} /> */}
        <Route path="/home" element={<Home setfunc={setdata}/>} />
        <Route path="/summarization" element={<Summarization response={responseData}/>} />
        <Route path="/quiz" element={<Quiz response={responseData}/>} />
        <Route path="/flashcards" element={<FlashCards response={responseData}/>} />
        <Route path="/recentfiles" element={<RecentFiles/>} />
        <Route path="/view/:fileId" element={<FileView />} />
      </Routes>
    </Router>
    
  );
}

export default App;
