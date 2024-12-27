import React, { useState } from 'react';
import axios from 'axios';
import './CourseForm.css'; // Importation du fichier CSS pour le style

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('image', image);

    axios.post('http://localhost:5000/api/courses', formData)
      .then(() => {
        alert('Course added successfully');
        setTitle('');
        setPrice('');
        setImage(null);
      })
      .catch((error) => {
        console.error('Error adding course:', error);
        alert('There was an error adding the course.');
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <input
          type="text"
          placeholder="Course Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Course Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="form-input"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-input"
        />
        <button className="submit-button">Add Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
