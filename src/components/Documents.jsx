import React from 'react'

function Documents() {
  return (
    <>
    <div className="container">
      <h5 className="title">All Documents</h5>
      <div className="card medium">
        <div className="card-body">
        <i className="fa-solid fa-receipt"></i>
        <h5 className="card-title">iPhone 15</h5>
        <p className="card-text">Bills</p>
        <button type="button" className="btn btn-success">View</button>
        <button type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="card medium">
        <div className="card-body">
        <i className="fa-solid fa-briefcase"></i>
        <h5 className="card-title">Salary</h5>
        <p className="card-text">Income</p>
        <button type="button" className="btn btn-success">View</button>
        <button type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </>
  )
}

export default Documents