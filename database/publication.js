const mongoose = require("mongoose");


// create schema

const BookSchema = mongoose.Schema(
{
    id:String,
    name :String,
    books:[String]
    
    }
);

const publicationModel = mongoose.model("publications", BookSchema);
module.exports = publicationModel;





