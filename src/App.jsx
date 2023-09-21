import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Login from "./Login";
import Gallerypage from "./Gallerypage";
import { UserAuth } from "./assets/AuthContext";
import { useEffect } from "react";
import TestDrag from "./test1";

function App() {
  const navigate = useNavigate();
  const { currentUser, loading } = UserAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Gallerypage />} />
        <Route path="/test" element={<TestDrag />} />
      </Routes>
    </>
  );
}

export default App;
