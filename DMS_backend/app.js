const express=require('express');
const app=express();
const mongoose=require('mongoose');
const mongoUrl="mongodb+srv://vcetdms:dmsadmin@cluster0.c7gpjhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
require('./student_info');
app.use(express.json());

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "J$U3Hm5Xz@q7L!oBt9YgPcTz#i*5aGvFq1EwR8pIu6N&vO4YtSrQ2jKxL!e1Z"



mongoose.connect(mongoUrl)
.then(()=>{
    console.log("Database Connected");
})
.catch((e)=>{
    console.log(e);
})

const Student=mongoose.model("StudentInfos");
const StudentInfo=mongoose.model("StudentInformation");
const Defaulter=mongoose.model("DefaulterTable");
const User = mongoose.model("UserInfo1") ;


app.get("/",(req,res)=>{
    res.send({status:"Started"})
})

app.post("/reg", async (req, res) => {
  const {username, email, mobile, password} = req.body;

  const olduser = await User.findOne({username: username});

  if(olduser){
      //return res.send({ data: "User already exists!!" });
      return res.send("User already exists!!");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
      await User.create({
          username: username,
          email: email,
          mobile,
          password : encryptedPassword,
      });
      res.send({status:"ok", data:"User Created"})
  } 
  catch (error) {
      res.send({status:"error", data: error})     
  }
});

app.post("/login-user", async(req, res) => {
  const {username, password} = req.body;
  const oldUser = await User.findOne({username: username});

  if(!oldUser){
      //return res.send({data: "User doesn't exists!!"});
      return res.send("User doesn't exists!!");
  }

  //Me Me - - - - - - - - - - - > 1
  if(! await bcrypt.compare(password, oldUser.password)){
      return res.send("Incorrect Password!!");
      //return res.send({data: "Incorrect Password!!"});
  }

  if( await bcrypt.compare(password, oldUser.password)){
      const token = jwt.sign({ username: oldUser.username }, JWT_SECRET);

      if(res.status(201)){
          return res.send({ status: 'ok', data: token});
      }
      else{
          return res.send({ error: 'error'});
      }
  }
});

app.post("/userdata", async (req, res) => {
  const {token} = req.body;

  try{
      const user = jwt.verify(token, JWT_SECRET);
      const userusername = user.username;

      User.findOne({ username: userusername }).then((data) => {
          return res.send({ status: 'ok', data: data });
      });
  } catch(error) {
      return res.send({ error: error});
  }
})

app.listen(5001, () => {
  console.log("Node js server started...");
});


app.get('/student/:rollNo', async (req, res) => {
    try {
      const rollNo = req.params.rollNo;
      const student = await StudentInfo.findOne({ RollNo: rollNo });
      if (!student) {
        // If student not found, send 404 status code
        return res.status(404).json({ error: 'Student not found' });
      }
      // If student found, send student data
      res.json(student);
    } catch (error) {
      // If an error occurs, send 500 status code with error message
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// app.post('/register',async(req,res)=>{
//     const{roll,name}=req.body;
//     try {
        
//         await StudentInfo.create({
//             Name:"Sriram Balaji",
//             RollNo:"22LITB03",
//             Dept:"IT",
//             Section:"B",
//             Year:3
            
//         });
//         res.send({status:"ok",data:"Data Inserted"});
//     } catch (error) {
//         res.send({status:"error",data:error});
//     }
// });

app.post('/mark-defaulter', async (req, res) => {
  try {
    // Extract student information and checkbox information from request body
    const { name, rollNo, dept, section, year, latecomer, idcard, dress, beard, hair } = req.body;

    // Check if a document with the same RollNo has been inserted today
    const isAlreadyScanned = await Defaulter.isAlreadyScannedToday(rollNo);
    if (isAlreadyScanned) {
      return res.status(400).json({ error: 'Roll number has already been scanned today' });
    }

    // Create a new document in MongoDB collection with the extracted information
    const defaulter = await Defaulter.create({
      Name: name,
      RollNo: rollNo,
      Dept: dept,
      Section: section,
      Year: year,
      latecomer: latecomer,
      idcard: idcard,
      dress: dress,
      beard: beard,
      hair: hair,
      createdAt: new Date(), // Set the current date and time
    });

    // Send success response
    res.json({ message: 'Student marked as defaulter successfully', defaulter });
  } catch (error) {
    // Send error response
    console.error(error);
    res.status(502).json({ error: 'Internal server error' });
  }
});

app.get('/check-scanned-today/:rollNo', async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    
    // Check if the roll number has already been scanned today using the Defaulter model
    const isScannedToday = await Defaulter.isAlreadyScannedToday(rollNo);

    // Assuming isScannedToday is a boolean indicating whether the roll number has been scanned today
    res.json({ scannedToday: isScannedToday });
  } catch (error) {
    console.error(error);
    res.status(501).json({ error: 'Internal server error' });
  }
});






  
    app.get('/defaulterFetch', async (req, res) => {
    try {
      let query = {};
  
      // Extract fromDate and toDate from query parameters
      const { fromDate, toDate, department} = req.query;
  
      // If both fromDate and toDate are provided, filter by date range
      if (fromDate && toDate) {
        // Convert fromDate and toDate strings to Date objects
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
  
        // Check if the fromDate and toDate are valid dates
        if (!isNaN(fromDateObj.valueOf()) && !isNaN(toDateObj.valueOf())) {
          // Set query to filter by createdAt field between fromDate and toDate
          query = {
            createdAt: {
              $gte: fromDateObj, // $gte means greater than or equal to
              $lte: toDateObj,   // $lte means less than or equal to
            },
          };
        } else {
          return res.status(400).json({ error: 'Invalid date format' });
        }
      }
      if (department) {
        query.Dept = department;
    }

      // Fetch defaulter data based on the query
      const defaulters = await Defaulter.find(query);
  
      res.json(defaulters);
    } catch (error) {
      console.error('Error fetching defaulter data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
