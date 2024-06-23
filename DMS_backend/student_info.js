const mongoose=require('mongoose');

const UserDetailSchema = new mongoose.Schema({
  username: { type: String, unique: true},
  email: String,
  mobile: String,
  password: String,
},{
  collection: "UserInfo1"
});

mongoose.model("UserInfo1", UserDetailSchema);


const StudentInfoSchema = new mongoose.Schema({
    RollNo:{type:String,unique:true},
    Name:String,
   
},{
    collection:"StudentInfos"
})
mongoose.model("StudentInfos",StudentInfoSchema);

const StudentInformationSchema = new mongoose.Schema({
    Name:String,
    RollNo:{type:String,unique:true},
    Dept:String,
    Section:String,
    Year:Number
},{
    collection:"StudentInformation"
})
mongoose.model("StudentInformation",StudentInformationSchema);

// const DefaulterSchema = new mongoose.Schema({
//     Name:String,
//     RollNo:{type:String,unique:true},
//     Dept:String,
//     Section:String,
//     Year:Number,
//     latecomer: Boolean,
//     idcard: Boolean,
//     dress: Boolean,
//     beard: Boolean,
//     hair: Boolean,
//   },{
//     collection:"DefaulterTable"
// })
// mongoose.model("DefaulterTable",DefaulterSchema);



// const DefaulterSchema = new mongoose.Schema({
//   Name: String,
//   RollNo: { type: String, unique: true },
//   Dept: String,
//   Section: String,
//   Year: Number,
//   latecomer: Boolean,
//   idcard: Boolean,
//   dress: Boolean,
//   beard: Boolean,
//   hair: Boolean,
//   createdAt: { type: Date, default: Date.now } // New field for storing the date and time
// }, {
//   collection: "DefaulterTable"
// });

// module.exports = mongoose.model("DefaulterTable", DefaulterSchema);
const DefaulterSchema = new mongoose.Schema({
  Name: String,
  RollNo: String ,
  Dept: String,
  Section: String,
  Year: Number,
  lastScannedAt: Date, // Field to store the last scanned date and time
  latecomer: Boolean,
  idcard: Boolean,
  dress: Boolean,
  beard: Boolean,
  hair: Boolean,
  createdAt: { type: Date, default: Date.now } // Field to store the creation date and time
}, {
  collection: "DefaulterTable"
});

// Static method to check if a roll number has already been scanned today
DefaulterSchema.statics.isAlreadyScannedToday = async function(rollNo) {
  // Find if the roll number has already been scanned today
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours to beginning of the day
  const count = await this.countDocuments({ RollNo: rollNo, lastScannedAt: { $gte: today } });
  return count > 0;
};

// Pre-save middleware to update the last scanned date if it's a new scan
DefaulterSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.lastScannedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("DefaulterTable", DefaulterSchema);