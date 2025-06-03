  const express = require('express');
  const bodyParser = require('body-parser');
  const mysql = require('mysql');
  const cors = require('cors');

  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // MySQL connection
  const db = mysql.createConnection({
   host: 'localhost',
  user: 'root',               // Change this if you have a different user
//   password: 'cfl@2025',  // Replace with your actual password
  database: 'contact_form'
  });

  db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
  });

  // Endpoint to handle form submission
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    
    db.query(query, [name, email, message], (err, result) => {
      if (err) {
        return res.status(500).send('Error saving data');
      }
      res.status(200).send('Message sent successfully');
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  