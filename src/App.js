import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import CourseEdit from './components/CourseEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route */}

        {/* Admin Dashboard Route */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/edit-course/:id" element={<CourseEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
