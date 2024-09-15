import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../constants';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AssignSubjects = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const studentsResponse = await axios.get(`${baseUrl}/api/schools/all-students`, {
          headers: { Authorization: `${token}` }
        });
        setStudents(studentsResponse.data);

        const subjectsResponse = await axios.get(`${baseUrl}/api/subjects`, {
          headers: { Authorization: `${token}` }
        });
        setSubjects(subjectsResponse.data);
      } catch (error) {
        setError('Failed to fetch data. Please try again.');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAssignSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(`${baseUrl}/api/subjects/assign`, {
        studentId: selectedStudent,
        subjectIds: selectedSubjects,
      }, {
        headers: { Authorization: `${token}` }
      });

      setMessage(response.data.message);
      setError('');
      
      // Hide message after 1 second
      setTimeout(() => setMessage(''), 1000);
    } catch (error) {
      setError('Failed to assign subjects. Please try again.');
      console.error(error);
    }
  };

  const handleSubjectChange = (event) => {
    const options = event.target.options;
    const values = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);

    setSelectedSubjects(values);
  };

  return (
    <Container>
          <h1 className="my-4"> <Link to="/school-admin-dashboard" >Home</Link>  / Assign Subjects</h1>


      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Student</Form.Label>
          <Form.Control
            as="select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Subjects</Form.Label>
          <Form.Control
            as="select"
            multiple
            value={selectedSubjects}
            onChange={handleSubjectChange}
          >
            {subjects.map(subject => (
              <option key={subject._id} value={subject._id}>{subject.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleAssignSubjects}>
          Assign Subjects
        </Button>
      </Form>
    </Container>
  );
};

export default AssignSubjects;
