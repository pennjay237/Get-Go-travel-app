import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import Destination from "./Pages/Destination";
import AppLayout from "./component/Layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AppLayout />}>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/destination" element={<Destination />} />
      </Route>
    </Routes>
  );
}

export default App;