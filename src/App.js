import './App.css';
import Home from './Components/Home';
import Summarization from './Frontend/Summarization';
import Quiz from './Frontend/Quiz';
import FlashCards from './Frontend/FlashCards';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [responseData, setResponseData] = useState(null);

  const setdata = (data) => {
    setResponseData(data);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setfunc={setdata}/>} />
        <Route path="/summarization" element={<Summarization response={responseData}/>} />
        <Route path="/quiz" element={<Quiz response={responseData}/>} />
        <Route path="/flashcards" element={<FlashCards response={responseData}/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
