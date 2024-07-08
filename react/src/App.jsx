import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Script from "./components/Script.jsx";

function App() {

  const [active, setActive] = useState(2)

  function updateIndex(newIndex) {
    setActive(newIndex);
  }

  return (
    <div className="flex justify-between">

      {/* <div className="flex-1">
        <Sidebar />
      </div>

      <div className="flex-[5]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/writer" element={<Script />} />
        </Routes>
      </div> */}

      <div className="flex-1">
        <Sidebar active={active} />
      </div>
      <div className="flex-[5]">
        <Script index={active} onUpdate={updateIndex} />
      </div>

    </div>
  );
}

export default App;
