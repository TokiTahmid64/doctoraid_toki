const express = require('express');
const app = express();
const port = 5000;

app.use(express.json()); // Add this line to parse incoming JSON data

let usersData = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "01711964027"
  },
  {
    "id": '2',
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "987-654-3210"
  },
  {
    "id": '3',
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "phoneNumber": "555-555-5555"
  }
];


let doctors = [
  {
    "username": "doctor1",
    "password": "ZG9jdG9yMTIz"
  }
];




app.post('/login', (req, res) => {
  const formData = req.body; // This will contain the data sent from the frontend
  console.log("Data received from frontend:", formData);

  // Check if a doctor with the provided username and password exists in the doctors array
  const doctor = doctors.find(
    (doc) =>
      doc.username === formData.username && doc.password === formData.password
  );

  if (doctor) {
    // If a matching doctor is found, send a success response
    res.status(200).json({ message: "Login successful!", doctor });
  } else {
    // If no matching doctor is found, send an error response
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

app.post('/search', (req, res) => {
  const formData = req.body; // This will contain the data sent from the frontend
  console.log("Data received from frontend:", formData);

  const searchId = Number(formData.id);
  const user = usersData.find(
    (user) => user.id === searchId && user.phoneNumber === formData.phoneNumber
  );

  if (user) {
    console.log("User found:", user);
    // If a matching user is found, send the user data as a response
    res.status(200).json({ message: "User found!", user });
  } else {
    // If no matching user is found, send an error response
    res.status(404).json({ message: "User not found!" });
  }
});

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
