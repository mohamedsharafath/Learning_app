import './App.css';
import Home from './Components/Home';
import Summarization from './Frontend/Summarization';
import Quiz from './Frontend/Quiz';
import FlashCards from './Frontend/FlashCards';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarization" element={<Summarization />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/flashcards" element={<FlashCards />} />
      </Routes>
    </Router>
    
  );
}

export default App;
