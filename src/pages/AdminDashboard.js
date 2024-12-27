import React from 'react';
import CourseList from '../components/CourseList';

const AdminDashboard = () => {
  return (
    <div>
    <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Admin Dashboard</h1>
    <CourseList />
  </div>
  );
};

export default AdminDashboard;
