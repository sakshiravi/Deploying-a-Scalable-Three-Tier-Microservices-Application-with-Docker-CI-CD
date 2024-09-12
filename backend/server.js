const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// MySQL connection pool setup
const pool = mysql.createPool({
  host: 'mysql', // Use the service name defined in docker-compose
  user: 'root',
  password: 'sakshiaruna', // Replace with your MySQL password
  database: 'db', // Your database name
  connectionLimit: 10 // Adjust the number of connections as needed
});

// API route to handle form data submission
app.post('/api/users', (req, res) => {
  const { username, dob } = req.body;

  // Log the data received from the frontend
  console.log("Received data from frontend:", req.body);

  const sql = 'INSERT INTO info (username, DateofBirth) VALUES (?, ?)';

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      return res.status(500).send('Server error');
    }

    // Query the database
    connection.query(sql, [username, dob], (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error inserting data into database:', err);
        return res.status(500).send('Server error');
      }

      res.status(200).json({ message: 'User data inserted successfully' });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
