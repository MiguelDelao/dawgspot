const express = require('express');
const app = express();
const port = 8089;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

const USERNAME = 'database_user';
const PASSWORD = 'database_pass';

// Connect to Database
const conn_str = `mongodb+srv://${USERNAME}:${PASSWORD}@dawgspot-cluster.86zdcsy.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(conn_str)
  .then(() => {
    app.listen(port);
    console.log('MongoDB Connection Succeeded..');
    console.log(`Backend server running on port ${port}.`);
  })
  .catch(error => {
    console.log(`Error starting backend: ${error}`);
});

const users = require('./routes/api/users');
const games = require('./routes/api/games')
app.use('/api/users', users);
app.use('/api/games', games);

// Server Routes
app.get('/', (req, res) => res.send('Hello, world!'));
