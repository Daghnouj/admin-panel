import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CourseForm from './CourseForm'; // Import du formulaire
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // État pour afficher le formulaire
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [coursesPerPage] = useState(6); // Nombre de cours par page
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        alert('There was an error fetching the courses.');
      });
  }, []);

  const deleteCourse = (id) => {
    axios.delete(`http://localhost:5000/api/courses/${id}`)
      .then(() => {
        setCourses(courses.filter((course) => course._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
        alert('There was an error deleting the course.');
      });
  };

  const editCourse = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculer le nombre total de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCourses.length / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="course-list-container">
      <h2 className="course-list-title">Available Courses</h2>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Bouton personnalisé "Add Course" */}
      <div className="add-button-container">
        <button
          className="custom-add-button"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <FontAwesomeIcon icon={faPlus} /> 
        </button>
      </div>

      {/* Formulaire affiché conditionnellement */}
      {isFormVisible && <CourseForm />}

      <div className="course-list">
        {currentCourses.length === 0 ? (
          <p>No courses available</p>
        ) : (
          currentCourses.map((course) => (
            <div className="course-item" key={course._id}>
              <img
                src={`http://localhost:5000/uploads/${course.image}`}
                alt={course.title}
                className="course-image"
              />
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-price">${course.price}</p>
                <div className="course-actions">
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrash} /> 
                  </button>
                  <button
                    onClick={() => editCourse(course._id)}
                    className="edit-button"
                  >
                    <FontAwesomeIcon icon={faEdit} /> 
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
