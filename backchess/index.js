const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const UserRouter = require('./routes/UserRoutes');
const RoleRouter = require('./routes/RoleRoutes');
const AuthorizeRouter = require('./routes/AuthorizeRoutes');
const ChallengeRoutes = require('./routes/ChallengeRoutes');
const ParticipantRoutes = require('./routes/ParticipantRoutes');
const RankRoutes = require('./routes/RankRoutes');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use('/api/authorize', AuthorizeRouter);
app.use('/api/user', UserRouter);
app.use('/api/role', RoleRouter);
app.use('/api/challenge', ChallengeRoutes);
app.use('/api/participant', ParticipantRoutes);
app.use('/api/rank', RankRoutes);


// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Error syncing database', err);
});


// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Chess Puzzle API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});