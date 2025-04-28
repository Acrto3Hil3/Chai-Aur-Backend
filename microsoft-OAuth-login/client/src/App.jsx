import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
