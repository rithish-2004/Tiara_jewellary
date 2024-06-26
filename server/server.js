const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeModel = require("./models/Employee");
const Chit = require("./models/chitmaster");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tiara");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
app.post('/uploadProfileImage', upload.single('profileImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    console.log("Image received:", req.file);
    const imageUrl = `http://localhost:3002/uploads/${req.file.filename}`;
    res.json({ success: true, message: 'Image received successfully', imageUrl });
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/employee', async (req, res) => {
    try {
        const { username, repassword } = req.body;
        console.log("Received username:", username);
        console.log("Received password:", repassword);
        const results = await employeeModel.find();
        console.log("Employee Records:",results);
        results.forEach((record) => {
        const { name, password } = record;
        console.log("Name:", name);
        console.log("Password:", password);
        if(username===name && repassword===password){
            console.log("Matched")
            res.json({ success: true, message: 'Username and password are correct' });
        }
        else{
            console.log("Incorrect")
            res.json({ success: false, message: 'Username and password are incorrect' });
        }
        });
        
    } catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/chits', async (req, res) => {
  try {
    const {
      startingdate,
      chitname,
      groupname,
      duetype,
      duedays,
      totaldues,
      dueamount,
      incentivecutdays,
      incentivepercent,
      incentiveamount,
      recieptac,
      latefeeac,
    } = req.body;
const latestcustomer=await Chit.findOne().sort({id:-1});
const nextid=latestcustomer?latestcustomer.id+1:1;
    const newCustomer = new Chit({
      id:nextid,
      startingDate: startingdate,
      ChitName: chitname,
      GroupName: groupname,
      DueType: duetype,
      DueDays: duedays,
      TotalDues: totaldues,
      DueAmount: dueamount,
      IncentiveCutDays: incentivecutdays,
      IncentivePercentage: incentivepercent,
      IncentiveAmt: incentiveamount,
      ReceiptAC: recieptac,
      LateFeeAC: latefeeac,
    });

    const savedChit = await newCustomer.save();
    console.log(savedChit);
    res.json({ success: true, message: 'Chit details saved successfully', chit: savedChit });
  } catch (error) {
    console.error('Error handling chit details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/checkChitName', async (req, res) => {
  try {
    const { ChitName } = req.body;
    console.log("Received ChitName:", ChitName);

    const chitDetails = await Chit.findOne({ ChitName });

    if (chitDetails) {
      console.log("Matched");
      res.json({ success: true, message: 'ChitName is correct', chitDetails });
    } else {
      console.log("Incorrect");
      res.json({ success: false, message: 'ChitName is incorrect' });
    }
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/*
app.get('/api/chits', async (req, res) => {
  try {
    const chits = await Chit.find();
    res.setHeader('Content-Type', 'application/json');
    res.json(chits);
  } catch (error) {
    console.error('Error fetching chits:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
// ... (Your other routes)
// Fetch Chits API
app.get('/api/chits1', async (req, res) => {
  try {
    const chits = await Chit.find();
    res.json(chits);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/chitDetails/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const chitDetails = await Chit.findById(id);
    res.json({success:true,message:'Details are fetched',chitDetails});
  } catch (error) {
    console.error('Error fetching chit details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
// Update Chit Details API
app.put('/api/chitDetails/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Update the chit details in the database
    await Chit.findOneAndUpdate({ ChitName: id }, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create Chit API
app.post('/api/chits1', async (req, res) => {
  try {
    const newChit = await Chit.create(req.body);
    res.json(newChit);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
app.post('/savecustomerdetails', async (req, res) => {
  try {
    const {
      _id,
      startingdate,
      chitname,
      groupname,
      duetype,
      duedays,
      totaldues,
      dueamount,
      incentivecutdays,
      incentivepercent,
      incentiveamount,
      recieptac,
      latefeeac,
    } = req.body;
    console.log(req.body)
    // Check if _id and other required fields are present in the request body
    if (!_id) {
      return res.status(400).json({ error: 'Missing _id in the request body' });
    }

    // Assuming nextid is declared and assigned a value
    const nextid = _id;
    console.log(_id);
    const updatedCustomer = await Chit.findOneAndUpdate(
      { _id },
      {
        $set: {
          startingDate: startingdate,
          ChitName: chitname,
          GroupName: groupname,
          DueType: duetype,
          DueDays: duedays,
          TotalDues: totaldues,
          DueAmount: dueamount,
          IncentiveCutDays: incentivecutdays,
          IncentivePercentage: incentivepercent,
          IncentiveAmt: incentiveamount,
          ReceiptAC: recieptac,
          LateFeeAC: latefeeac,
        },
      },
      { new: true } // return the modified document
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ success: true, message: 'Customer details updated successfully', customer: updatedCustomer });
  } catch (error) {
    console.error('Error handling customer details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/deletecustomer', async (req, res) => {
  try {
    const { id } = req.body;

    // Validate if id is provided
    if (!id) {
      return res.status(400).json({ success: false, message: 'Customer ID is required' });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    
    // Find and delete the customer record
    const deletedCustomer = await Chit.findByIdAndDelete(objectId);

    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error handling delete request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
});