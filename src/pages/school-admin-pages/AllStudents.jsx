import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../constants';
import { Container, ListGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${baseUrl}/api/schools/all-students`, {
          headers: { Authorization: `${token}` }
        });

        setStudents(response.data);
      } catch (error) {
        setError('Failed to fetch students. Please try again.');
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container>
      <h1 className="my-4"> <Link to="/school-admin-dashboard" >Home</Link>  / All Students</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <ListGroup>
        {students.map(student => (
          <ListGroup.Item key={student._id}>
            <h5>{student.name}</h5>
            <p>Email: {student.email}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AllStudents;
