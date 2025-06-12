// Vulnerable Node.js Express app example

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.urlencoded({ extended: true }));

// In-memory SQLite database for demo
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'adminpass')");
});

// XSS Vulnerable page: reflects user input directly into HTML without sanitization
app.get('/xss', (req, res) => {
  const user = req.query.user;
  // Vulnerable: directly inserting user input into HTML without encoding
  res.send(`<h1>Welcome back, ${user}!</h1>`);
});

// SQL Injection vulnerable login simulation
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Vulnerable: directly concatenating user input into SQL query
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.get(query, (err, row) => {
    if (err) {
      res.send('Database error');
    } else if (row) {
      res.send(`Welcome, ${row.username}`);
    } else {
      res.send('Invalid credentials');
    }
  });
});

// Remote Code Execution vulnerable endpoint
app.get('/rce', (req, res) => {
  const cmd = req.query.cmd;
  // Vulnerable: executing user input directly as shell command
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      res.send(`Error: ${stderr}`);
    } else {
      res.send(`<pre>${stdout}</pre>`);
    }
  });
});

app.listen(3000, () => {
  console.log('Vulnerable app listening on port 3000');
});
