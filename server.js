const app = require('./app')
const mongoose = require("mongoose")
const {DB_HOST} = process.env;
// const DB_HOST = "mongodb+srv://baydindenys:iRAMLfPVZ0GFzMih@transcedence.qm6y54a.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
.then(() => {
app.listen(3000)
console.log("Database connection successful");
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})