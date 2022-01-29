//var DB_CONNECTION ="mongodb://localhost:27017/testdb";
var DB_CONNECTION = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
const recordRoute = require('./routes/record');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//const utils = require('./utils/task-schema.js')


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())




app.get('/', (req, res) => {
	res.send('We are  page level on HomePage')
});
app.use('/records', recordRoute);

// Connect MongoDB
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});
const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => {
	console.log("Running RESTful API on port http://localhost:3000");
});
