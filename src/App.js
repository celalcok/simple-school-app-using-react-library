// System import
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom import
import Home from './pages/home/Home';
import Students from './pages/students/Students';
import StudentAdd from './pages/students/StudentAdd';
import StudentEdit from './pages/students/StudentEdit';
import StudentDetails from './pages/students/StudentDetails';
import StudentAttendence from './pages/students/StudentAttendence';
import StudentAttendenceAdd from './pages/students/StudentAttendenceAdd';
import Lessons from './pages/lessons/Lessons';
import Classess from './pages/classess/Classes';
import Grades from './pages/grades/Grades';
import GradeAdd from './pages/grades/GradeAdd';
import GradeTypes from './pages/grades/GradeTypes';
import Teachers from './pages/teachers/Teachers';
import TeacherAdd from './pages/teachers/TeacherAdd';
import TeacherEdit from './pages/teachers/TeacherEdit';
import TeacherDetails from './pages/teachers/TeacherDetails';
function App() {

  return (
    <Router>
        <div className='app'>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Students */}
          <Route path="/students" element={<Students />} />
          <Route path="/add-student" element={<StudentAdd />} />
          <Route path="/update-student/:id" element={<StudentEdit />} />
          <Route path="/details-student/:id" element={<StudentDetails />} />
          <Route path="/student-attendence" element={<StudentAttendence />} />
          <Route path="/add-student-attendence/:id" element={<StudentAttendenceAdd />} />


          {/* Teachers */}
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/add-teacher" element={<TeacherAdd />} />
          <Route path="/edit-teacher/:id" element={<TeacherEdit />} />
          <Route path="/details-teacher/:id" element={<TeacherDetails />} />

          {/* Lessons */}
          <Route path="/lessons" element={<Lessons />} />

          {/* Classess */}
          <Route path="/classes" element={<Classess />} />

          {/* Grades */}
          <Route path="/grades" element={<Grades />} />
          <Route path="/add-grade/:id" element={<GradeAdd />} />
          <Route path="/gradetypes" element={<GradeTypes />} />
        </Routes>

        </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
