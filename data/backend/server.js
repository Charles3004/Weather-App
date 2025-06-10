const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const logFile = 'logs.json';

// Ensure log file exists
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, JSON.stringify([]));
}

// POST endpoint to log weather data
app.post('/api/log-weather', (req, res) => {
  const newEntry = req.body;
  const logs = JSON.parse(fs.readFileSync(logFile));
  logs.push({ ...newEntry, timestamp: new Date() });
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  res.status(201).json({ message: 'Weather log saved!' });
});


app.get('/api/logs', (req, res) => {
  const logs = JSON.parse(fs.readFileSync(logFile));
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Weather logger running at http://localhost:${PORT}`);
});
