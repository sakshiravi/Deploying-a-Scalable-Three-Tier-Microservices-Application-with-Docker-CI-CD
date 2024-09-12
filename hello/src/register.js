import React, { useState } from 'react';

function Register() {
  // State hooks for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email_id: email,  // Match backend field names
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage(data.message);
        setError(''); // Clear error message if successful
      } else {
        setError(data.error || 'An error occurred');
        setMessage(''); // Clear success message if there's an error
      }
    } catch (err) {
      setError('Network error');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

