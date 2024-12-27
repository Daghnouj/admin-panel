import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseEdit.css';

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    price: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Récupération des données du cours pour l'ID donné
    axios.put(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        const { title, price, image } = response.data;
        setCourse({ title, price, image });
        setImagePreview(`http://localhost:5000/uploads/${image}`);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
        alert('Error fetching course data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourse({
      ...course,
      image: file,
    });
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('price', course.price);
    if (course.image) {
      formData.append('image', course.image);
    }

    axios.put(`http://localhost:5000/api/courses/${id}`, formData)
      .then(response => {
        alert('Course updated successfully');
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating course:', error);
        alert('There was an error updating the course.');
      });
  };

  return (
    <div className="edit-form-container">
      <h2 className="edit-form-title">Edit Course</h2>
      <form onSubmit={handleSubmit} className="edit-course-form">
        <div className="edit-form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
            className="edit-form-input"
          />
        </div>
        <div className="edit-form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            required
            className="edit-form-input"
          />
        </div>
        <div className="edit-form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="edit-form-input"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>
        <button type="submit" className="submit-button">Update Course</button>
      </form>
    </div>
  );
};

export default CourseEdit;
