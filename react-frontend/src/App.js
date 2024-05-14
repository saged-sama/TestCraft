import { AuthProvider } from './lib/AuthProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppControlProvider } from './lib/AppControlProvider';
import Home from './app/home';
import Authentication from './app/authentication';
import Console from './app/console';
import TakeExam from './app/takeExam/Exam.js'

function App() {
  return (
    <div data-theme="dracula" className="font-landing">
      <AuthProvider>
        <AppControlProvider>
          <Router>
            <Routes>
              <Route path="/*" element={<Home />}/>
              <Route path="/auth/*" element={<Authentication />}/>
              <Route path="/app/*" element={<Console />}/>
              <Route path="/app/Exam/:examID" element={<TakeExam />}/>
            </Routes>
          </Router>
        </AppControlProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
