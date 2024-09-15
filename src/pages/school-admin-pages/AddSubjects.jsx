import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../constants';
import { Container, Form, Button, ListGroup, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: '', code: '', description: '' });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`${baseUrl}/api/subjects`, {
        headers: { Authorization: `${token}` }
      });
      setSubjects(response.data);
    } catch (error) {
      setError('Failed to fetch subjects. Please try again.');
      console.error(error);
    }
  };

  const handleCreateSubject = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(`${baseUrl}/api/subjects/create`, newSubject, {
        headers: { Authorization: `${token}` }
      });

      setMessage('Subject created successfully.');
      setNewSubject({ name: '', code: '', description: '' });
      fetchSubjects();
    } catch (error) {
      setError('Failed to create subject. Please try again.');
      console.error(error);
    }
  };

  const handleUpdateSubject = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`${baseUrl}/api/subjects/update/${selectedSubject._id}`, selectedSubject, {
        headers: { Authorization: `${token}` }
      });

      setMessage('Subject updated successfully.');
      setShowModal(false);
      fetchSubjects();
    } catch (error) {
      setError('Failed to update subject. Please try again.');
      console.error(error);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`${baseUrl}/api/subjects/delete/${subjectId}`, {
        headers: { Authorization: `${token}` }
      });

      setMessage('Subject deleted successfully.');
      fetchSubjects();
    } catch (error) {
      setError('Failed to delete subject. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className="my-4"> <Link to="/school-admin-dashboard" >Home</Link>  / Manage Subjects</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            placeholder="Enter subject name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            value={newSubject.code}
            onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
            placeholder="Enter subject code"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newSubject.description}
            onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
            placeholder="Enter subject description"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreateSubject}>
          Create Subject
        </Button>
      </Form>

      <h2>Subject List</h2>
      <ListGroup>
        {subjects.map(subject => (
          <ListGroup.Item key={subject._id}>
            <h5>{subject.name}</h5>
            <p>{subject.code}</p>
            <p>{subject.description}</p>
            <Button
              variant="warning"
              className="me-2"
              onClick={() => {
                setSelectedSubject(subject);
                setShowModal(true);
              }}
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteSubject(subject._id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for Updating Subject */}
      {selectedSubject && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedSubject.name}
                  onChange={(e) => setSelectedSubject({ ...selectedSubject, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedSubject.code}
                  onChange={(e) => setSelectedSubject({ ...selectedSubject, code: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedSubject.description}
                  onChange={(e) => setSelectedSubject({ ...selectedSubject, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateSubject}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default AddSubjects;
