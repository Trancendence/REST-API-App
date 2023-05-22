const app = require('./app')
const mongoose = require("mongoose")
const {DB_HOST, PORT = 3000} = process.env;
// const DB_HOST = "mongodb+srv://baydindenys:iRAMLfPVZ0GFzMih@transcedence.qm6y54a.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
.then(() => {
app.listen(PORT)
console.log("Database connection successful");
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})