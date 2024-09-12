import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, dob }), // Send the date in YYYY-MM-DD format
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSubmittedData({ username, dob });
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data:</h2>
          <p><strong>Username:</strong> {submittedData.username}</p>
          <p><strong>Date of Birth:</strong> {submittedData.dob}</p>
        </div>
      )}
    </div>
  );
}

export default App;
