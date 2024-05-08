import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Download from "./pages/Download";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./routing/ProtectedRoute";
import DownloadProtectRoute from "./routing/DownloadProtectRoute";
import AccessDenied from "./pages/AccessDenied";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/download/:id"
            element={
              <DownloadProtectRoute>
                <Download />
              </DownloadProtectRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/denied" element={<AccessDenied />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
