const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  password: String
});

const EmployeeModel = mongoose.model("user", employeeSchema);

module.exports = EmployeeModel;