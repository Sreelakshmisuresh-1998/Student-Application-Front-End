import React, { useState, useEffect } from 'react';

const AdmissionApp = () => {
  const [student, setStudent] = useState({ name: '', dob: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Post data to Tomcat server
    fetch('http://localhost:8080/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true);

    // Fetch data from Tomcat server
    fetch('http://localhost:8080/api/students/1')
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dob">DOB:</label>
          <input
            type="text"
            id="dob"
            name="dob"
            value={student.dob}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default AdmissionApp;
