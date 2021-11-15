const mongoose = require("mongoose");


// create schema

const BookSchema = mongoose.Schema(
{
    id:String,
    name : String,
    books : [String]
    }
);

const authorsModel = mongoose.model("authours", BookSchema);
module.exports = authorsModel;