const mongoose = require("mongoose");

// create schema

const BookSchema = mongoose.Schema(
{
    ISBN:String,
    title: String,
    authors:[Number],
    language:String,
    pubDate:String,
    numOfpage:Number,
    category:[String],
    publication:Number
    }
);

const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;
