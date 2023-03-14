import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Components/Login Component/LoginPage";
import Navbar from "./Components/NavBar/Navbar";
import SubjectPage from "./Components/Pages/Subject/Subject";


function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/subject" element={<SubjectPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
