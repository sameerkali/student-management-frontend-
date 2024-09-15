import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button, Alert } from 'react-bootstrap';
import { baseUrl } from '../../constants';
import { Link } from 'react-router-dom';

const ManageSchools = () => {
  const [schools, setSchools] = useState([]);
  const [newSchool, setNewSchool] = useState({ name: '', address: '', fields: [] });
  const [fieldToRemove, setFieldToRemove] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all schools
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${baseUrl}/api/schools/all`, {
          headers: { Authorization: `${token}` }
        });
        setSchools(response.data);
      } catch (error) {
        setError('Failed to fetch schools. Please try again.');
        console.error(error);
      }
    };

    fetchSchools();
  }, []);

  const handleAddSchool = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(`${baseUrl}/api/schools/add`, newSchool, {
        headers: { Authorization: `${token}` }
      });

      setMessage(response.data.message);
      setNewSchool({ name: '', address: '', fields: [] });
      setError('');
    } catch (error) {
      setError('Failed to add school. Please try again.');
      console.error(error);
    }
  };

  const handleRemoveField = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.put(`${baseUrl}/api/schools/remove-field`, {
        schoolId: selectedSchoolId,
        fieldToRemove
      }, {
        headers: { Authorization: `${token}` }
      });

      setMessage(response.data.message);
      setFieldToRemove('');
      setError('');
    } catch (error) {
      setError('Failed to remove field. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 className="my-4"> <Link to="/super-admin-dashboard" >Home</Link>  / Manage Schools</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      {/* Add School Form */}
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>School Name</Form.Label>
          <Form.Control
            type="text"
            value={newSchool.name}
            onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={newSchool.address}
            onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fields (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={newSchool.fields.join(', ')}
            onChange={(e) => setNewSchool({ ...newSchool, fields: e.target.value.split(',').map(f => f.trim()) })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddSchool}>
          Add School
        </Button>
      </Form>

      {/* Remove Field Form */}
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Select School</Form.Label>
          <Form.Control
            as="select"
            value={selectedSchoolId}
            onChange={(e) => setSelectedSchoolId(e.target.value)}
          >
            <option value="">Select a school</option>
            {schools.map(school => (
              <option key={school._id} value={school._id}>{school.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Field to Remove</Form.Label>
          <Form.Control
            type="text"
            value={fieldToRemove}
            onChange={(e) => setFieldToRemove(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" onClick={handleRemoveField}>
          Remove Field
        </Button>
      </Form>

      {/* Schools Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody>
          {schools.map(school => (
            <tr key={school._id}>
              <td>{school.name}</td>
              <td>{school.address}</td>
              <td>{school.fields.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageSchools;
