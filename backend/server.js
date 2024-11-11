const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors')

// Load environment variables from config file
dotenv.config({ path: path.join(__dirname, "config/config.env") });

const app = express();
require('./models/database'); // Connect to the database after environment variables are loaded

const router = require('./routes/routes');

app.use(express.json());
app.use(cors());
app.use('/api/tasks', router);

// Serve the React app's static files from the 'build' folder
if (process.env.NODE_ENV==='production')
{
  app.use(express.static(path.join(__dirname, "../frontend/build")));

// Handle any other requests by serving index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});}


const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
