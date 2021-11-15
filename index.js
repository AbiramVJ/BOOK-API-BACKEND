//main back end code


const BookModel = require("./database/book");
const authorsModel = require("./database/authors");
const publicationModel = require("./database/publication");


/* using express====================================================================================*/

const express = require("express");
const { request } = require("express");
const app = express();
app.use(express.json()); //it passesd incoming request from the payload

/*mongoDB connection================================================================================*/

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://abiram:9ms0jjYTJGbLX8WY@cluster0.ff9hx.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECTED SUCCESFULLY"));


/*
GET API
====================================================================================================================
  METHOD        GET
  route         localhost:3000  
  Description   get all the books
*/

app.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});



/*METHOD        GET
  route         localhost:3000/books/:isbn 
  Description   get all the books accoreding the id*/

app.get("/books/:isbn", async (req, res) => {
  const { isbn } = req.params; // PARAMS IS REQUEST PARAMETER
  const getSpecifibook = await BookModel.findOne({ ISBN: isbn });
  if (getSpecifibook === null) {
    return res.json({ error: `no book found for the ISBN of ${isbn}` });
  }
  return res.json(getSpecifibook);
});



/*METHOD        GET
  route         localhost:3000/books-category/:cat 
  Description   get the books details according to the category*/

app.get("/books-category/:cat", async (req, res) => {
  const { cat } = req.params; // PARAMS IS REQUEST PARAMETER
  console.log(cat);
  const getbookCat = await BookModel.find({ category: cat });
  //console.log(getbookCat);
  if (getbookCat === 0) {
    return res.json({ error: `no category found for the category of ${cat}` });
  }
  return res.json(getbookCat);
});

/*METHOD        GET
  route         localhost:3000/authors
  Description   get the all the authors*/

app.get("/author", async (req, res) => {
  const getAllauthors = await authorsModel.find();
  return res.json(getAllauthors);
});


/*METHOD        GET
  route         localhost:3000/authors/3
  Description   display the author according to the id*/

app.get("/authors/:au", async (req, res) => {
  let { au } = req.params; // PARAMS IS REQUEST PARAMETER
  // au= Number(au);
  const getauthor = await authorsModel.findOne({ id: au });

  if (getauthor === 0) {
    return res.json({ error: `no author found for the id of ${au}` });
  }
  return res.json(getauthor);
});


/*METHOD        GET
  route         localhost:3000/publication
  Description   display the all publicATION*/

app.get("/publication", async (reg, res) => {
  const allPublication = await publicationModel.find();

  return res.json(allPublication);
});



/*METHOD        GET
  route         localhost:3000/publication-id/:pid
  Description   display the publication according to the id*/


app.get("/publication-id/:pid", async (reg, res) => {
  let { pid } = reg.params;
  const getPublication = await publicationModel.findOne({ id: pid });

  if (getPublication === 0) {
    return reg.json("error:", `no publication found for the is ${pid}`);
  }
  return res.json(getPublication);
});


/* 
post API
=========================================================================================
  METHOD        POST
  route         http://localhost:3000/addbook
  Description   Add the new book
*/

app.post("/addbook", async (request, respons) => {
  const addBook = await BookModel.create(request.body);
  return respons.json({books: addBook,message: "book was added"});
});


/*METHOD        POST
  route         localhost:3000/addauthor
  Description   add authors*/


app.post("/addauthor", async (request, respons) => {
  const Addauthor = await authorsModel.create(request.body);

  return respons.json({
    authours: Addauthor,
    message: "author was added",
  });
});



/*METHOD        POST
  route         http://localhost:3000/addPublication
  Description   add publication
*/

app.post("/addPublication", async (request, respons) => {
  const addPublication = await publicationModel.create(request.body);
  return respons.json({publications: addPublication,message: "publication was added",});
});

/*
update API PUT
=======================================================================================
  METHOD        PUT
  route         http://localhost:3000/book-update/12345ONE
  Description   update the book 
*/

app.put("/book-update/:isbn", async (request, respons) => {
  const { isbn } = request.params;
  const updatebook = await BookModel.findOneAndUpdate({ ISBN: isbn },request.body,{ new: true });
  return respons.json({bookUpdate: updatebook,message: "book update sucessfully",});
});



/*METHOD        PUT
  route         http://localhost:3000/book-update-author/1
  Description   update the author
*/

app.put("/book-update-author/:id", async (request, respons) => {
  const { id } = request.params;
  const updateAuthor = await authorsModel.findOneAndUpdate({ id: id },request.body,{ new: true });
  return respons.json({updateAuthor: updateAuthor,message: "author update sucessfully",});
});



/*
DELETE API
=======================================================================================
  METHOD        DELETE
  route         http://localhost:3000/book-delete/12345ONE
  Description   delete  the book 
*/

app.delete("/book-delete/:isbn", async (request, respons) => {
  const { isbn } = request.params;
  const deleteBook = await BookModel.deleteOne({ ISBN: isbn });
  return respons.json({deleteBook: deleteBook,message: "books delete sucessfully",});
});


///http://localhost:3000/book-author-delete/12345ONE/id
// app.delete("/book-author-delete/:isbn/:id",async(request,respons) => {
//     let {isbn, id}=request.params;
//     let getSpecifibook = await BookModel.findOne({ISBN:isbn});
//     if(getSpecifibook===null){
//         return respons.json({"error": `no book find ${id}`});
//     }
//     else{
//         getSpecifibook.authours.remove(id);
//         const deleteAuther = await BookModel.findOneAndUpdate({ISBN:isbn},getSpecifibook,{new:true});
//         return respons.json({deleteAuthers:deleteAuther, message:"specific author succesfullt delete by book id"});
//     }

// });

app.listen(3000, () => {
  console.log("MY EXPRESS APP IS RUNNING");
});
