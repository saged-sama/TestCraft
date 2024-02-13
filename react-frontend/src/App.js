import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home"
import Navbar from './Components/Navbar'
import CreateExam from "./Exam/CreateExam"
import TakeExam from "./Exam/TakeExam"


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Create-Exam" element={<CreateExam />} />
            <Route path="/Take-Exam" element={<TakeExam />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}
export default App;