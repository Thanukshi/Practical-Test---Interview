import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Components/Login Component/LoginPage";
import Navbar from "./Components/NavBar/Navbar";
import SubjectPage from "./Components/Pages/Subject/Subject";
import ClassroomPage from "./Components/Pages/Classroom/Classroom";
import TeacherPage from "./Components/Pages/Teacher/Teacher";
import StudentPage from "./Components/Pages/Student/Student";
import AllocateSubject from "./Components/Pages/AllocateSubjects/AllocateSubject";
import AllocateClassroom from "./Components/Pages/AllocateClassroom/AllocateClassroom";
import StudentList from "./Components/Pages/Student/StudentList";
import StudentEditPage from "./Components/Pages/Student/StudentEditPage";
import SubjectEditPage from "./Components/Pages/Subject/SubjectEdit";
import ClassroomEditPage from "./Components/Pages/Classroom/ClassroomEdit";
import TeacherEditPage from "./Components/Pages/Teacher/TeacherEdit";
import AllocateSubjectEdit from "./Components/Pages/AllocateSubjects/AllocateSubjectEdit";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/navbar" element={<Navbar />} />

          <Route path="/subject" element={<SubjectPage />} />
          <Route path="/Subject/Edit/:id" element={<SubjectEditPage />} />

          <Route path="/classroom" element={<ClassroomPage />} />
          <Route path="/classroom/edit/:id" element={<ClassroomEditPage />} />

          <Route path="/Teacher" element={<TeacherPage />} />
          <Route path="/Teacher/Edit/:id" element={<TeacherEditPage />} />

          <Route path="/AllocateSubject" element={<AllocateSubject />} />
          <Route path="/AllocateSubject/:id" element={<AllocateSubjectEdit />} />

          <Route path="/AllocateClassroom" element={<AllocateClassroom />} />

          <Route path="/Student" element={<StudentPage />} />
          <Route path="/Student/List" element={<StudentList />} />
          <Route path="/Student/Edit/:id" element={<StudentEditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
