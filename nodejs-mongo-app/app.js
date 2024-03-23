// Import required modules
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('debug', true);

// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Employees schema
const employeeSchema = new mongoose.Schema({
  name: String,
  designation: String,
  salary: Number,
  department: String,
});

// Create Employees model
const Employee = mongoose.model('employees', employeeSchema);

// Get an employee by name
app.get('/employees/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const employee = await Employee.findOne({ name });

    if (employee) {
      console.log('Employee found:', employee);
      res.send(employee);
    } else {
      console.log('Employee not found');
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Get all employees from the database
app.get('/employees', async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    console.log('All employees:', allEmployees);
    res.send(allEmployees);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

