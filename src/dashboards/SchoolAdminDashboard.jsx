import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SchoolAdminDashboard = () => {
  return (
    <div>
      <h2>school-admin-dashboard</h2>
      <Link to="/all-students">
        <Button>All Students</Button>
      </Link>
      <Link to="/assign-subjects">
        <Button>Assign Subjects</Button>
      </Link>
      <Link to="/add-subjects">
        <Button>Add Subjects</Button>
      </Link>
    </div>
  );
};

export default SchoolAdminDashboard;
