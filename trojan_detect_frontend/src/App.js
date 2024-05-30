import React from "react";
import ATPG from "./Components/ATPG.jsx";
import Main from "./Components/Main.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import RTL from "./Components/RTL/RTL.jsx";
import FlawFinder from "./Components/Python_Code_Analysis/FlawFinder.jsx";
import PythonAnalysis from "./Components/Python_Code_Analysis/PythonAnalysis.jsx";
import IPFS from "./Components/IPFS/IPFS.jsx";
import Secure from "./Components/IPFS/Secure.jsx";
import CProfiler from "./Components/Python_Code_Analysis/CProfiler.jsx";
import PCB from "./Components/PCB/PCB.jsx"
import Matlab from "./Components/Analog/Matlab.jsx"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/rtl" element={<RTL />} />
        <Route path="/" element={<Login />} />
        <Route path="/atpg" element={<ATPG />} />
        <Route path="/home" element={<Main />} />
        <Route path="/embedded" element={<FlawFinder />} />
        <Route path="/python" element={<CProfiler />} />
        <Route path="/IPFS" element={<Secure />} />
        <Route path="/pcb" element={<PCB />} />
        <Route path="/analog" element={<Matlab />} />
      </Routes>
    </Router>
  );
};

export default App;
