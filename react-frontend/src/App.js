import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./Components/Home"
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import ForgetPass from "./Auth/ForgetPass"


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/Login" element={<Login />}/>
         <Route path="/Signup" element={<Signup />}/>
         <Route path="/Forget-Password" element={<ForgetPass/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;