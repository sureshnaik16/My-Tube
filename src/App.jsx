import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { useState } from "react";
import SearchResults from "./Components/Feed/SearchResults";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar} sidebar={sidebar}/>
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}/>}/>
        <Route path="/watch/:categoryId/:videoId" element={<Home sidebar={sidebar}/>}/>
        <Route path="/query/:query" element={<Home sidebar={sidebar}/>} />
      </Routes>
    </div>
  )
};

export default App;