const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    cls: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "P"
    }
});

module.exports = mongoose.model("Student", studentSchema);