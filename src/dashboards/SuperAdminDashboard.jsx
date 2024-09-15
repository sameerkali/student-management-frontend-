import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SuperAdminDashboard = () => {
  return (
    <div>
    <h2>SuperAdminDashboard</h2>
    <Link to="/manage-schools">
        <Button>Manage Schools</Button>
      </Link>
    </div>
  )
}

export default SuperAdminDashboard