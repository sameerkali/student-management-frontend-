import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Spinner,
  Alert
} from "react-bootstrap";

const AllSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${baseUrl}/api/subjects/my-subjects`, {
        headers: {
          Authorization: `${token}` // Include token in the headers
        }
      });

      setSubjects(response.data); // Set subjects data
      setLoading(false); // Set loading to false
    } catch (error) {
      setError(error.message); // Set error message
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    ); // Show loading spinner
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">Error: {error}</Alert> // Show error message
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="my-4">All Subjects</h3>
      <Row>
        <Col md={8}>
          <ListGroup>
            {subjects.map(subject =>
              <ListGroupItem key={subject._id}>
                <h5>
                  {subject.name}
                </h5>
                <p>
                  {subject.description}
                </p>
              </ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AllSubjects;
