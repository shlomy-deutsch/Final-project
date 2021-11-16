const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    title: String,
    birthDate: Date,
    country: String,
    city: String,
    address: String
}, { toJSON: { virtuals: true }, id: false });

const EmployeeModel = mongoose.model("EmployeeModel", EmployeeSchema, "employees");

module.exports = EmployeeModel;