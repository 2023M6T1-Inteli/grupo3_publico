import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Upload from "./pages/Body";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload/:id" element={<Upload />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
