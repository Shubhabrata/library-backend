const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create connection

// addBook

app.post("/addBook", (request, response) => {
  const bookDetails = [
    request.body.isbn,
    request.body.title,
    request.body.author,
    request.body.category,
    request.body.description,
    request.body.shelfNumber,
    request.body.thumbnailImageURL,
    request.body.rating,
    request.body.copies
  ];
  let sql =
    "INSERT INTO books ( isbn, title, author , category , description , shelfNumber , thumbnailImageURL ,rating , copies)  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    connection.query(sql, bookDetails, (err, results) => {
      if (err) {
        response.sendStatus(500);
      } else {
        response.status(200).send({ status: 200, data: results });
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500);
    }
  });

});

app.get("/listBook", (request, response) => {
  let sql = "SELECT * FROM books";

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    connection.query(sql, (err, results) => {
      if (err) {
        console.log(error);
        response.sendStatus(500);
      } else {

        response
          .status(200)
          //.send({ status: 200, data: results });
          .send(results);
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500);
    }
  });
});

app.get("/getBook", (request, response) => {
  let sql = "SELECT * FROM books WHERE id=?";

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    //console.log(request.query.id);
    connection.query(sql, request.query.id, (err, results) => {
      if (err) {
        response.sendStatus(500, err);
      } else {
        response
          .status(200)
          //.send({ status: 200, data: results });
          .send(results.pop());
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500);
    }
  });
});

app.post("/updateBook", (request, response) => {
  const id = request.body.id;
  const bookDetails = [
    request.body.isbn,
    request.body.title,
    request.body.author,
    request.body.category,
    request.body.description,
    request.body.shelfNumber,
    request.body.thumbnailImageURL,
    request.body.rating,
    request.body.copies,
    id
  ];
  let sql =
    "UPDATE books SET  isbn = ?, title = ? , author = ? , category = ? , description = ? , shelfNumber = ? , thumbnailImageURL = ? ,rating = ? , copies = ? WHERE id = ?";

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    connection.query(sql, bookDetails, (err, results) => {
      if (err) {
        response.sendStatus(500);
      } else {
        response.status(200).send({ status: 200, data: results });
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500, error);
    }
  });
});

app.get("/deleteBook", (request, response) => {
  let sql = "DELETE FROM books WHERE id=?";

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    connection.query(sql, request.query.id, (err, results) => {
      if (err) {
        response.sendStatus(500, err);
      } else {
        response.status(200).send({ message: 'OK' });
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500);
    }
  });
});


app.get("/searchTitle", (request, response) => {
  let sql = "SELECT * FROM books WHERE title LIKE ?";
  //let sql = "SELECT * FROM books";
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    //console.log(request.query.id);
    connection.query(sql, "%" + request.query.title + "%", (err, results) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response
          .status(200)
          //.send({ status: 200, data: results });
          .send(results);
        console.log(sql, results);
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500);
    }
  });
});




app.get("/searchAuthor", (request, response) => {
  let sql = "SELECT * FROM books WHERE author LIKE ?";
  //let sql = "SELECT * FROM books";
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    //console.log(request.query.id);
    connection.query(sql, "%" + request.query.author + "%", (err, results) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response
          .status(200)
          //.send({ status: 200, data: results });
          .send(results);
        console.log(sql, results);
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500);
    }
  });
});




app.get("/searchCategory", (request, response) => {
  let sql = "SELECT * FROM books WHERE category LIKE ?";
  //let sql = "SELECT * FROM books";
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });

  connection.connect(error => {
    //console.log(request.query.id);
    connection.query(sql, "%" + request.query.category + "%", (err, results) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response
          .status(200)
          //.send({ status: 200, data: results });
          .send(results);
        console.log(sql, results);
      }
      connection.end();
    });

    if (error) {
      response.sendStatus(500);
    }
  });
});


// Issue book

app.get("/issueBook", (request, response) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });
  connection.connect(error => {
    const sql = "SELECT COUNT(id)  as  count FROM issues WHERE book_id = ? AND user_email= ? AND status = 'ISSUED'";
    connection.query(sql, [request.query.book_id, request.query.user_email], (err, results) => {
      if (err) {
        console.log('here 1');
        response.status(500).send(err);
        connection.end();
      }
      else {
        if (results.pop().count > 0) { // this book was already issued to the user.
          console.log('here 2');
          response.status(200).send({ message: 'Already issued' });
          connection.end();
        } else {
          const sql = "SELECT COUNT(id) as count FROM issues WHERE book_id = " + request.query.book_id + " AND (status = 'ISSUED' OR status = 'RENEWED')";
          connection.query(sql, (issued_err, issued_result) => {
            if (issued_err) {
              console.log('here 3', issued_err);
              response.status(500).send(issued_err);
              connection.end();
            }
            else {
              const sql = "SELECT copies FROM books WHERE id = ?";
              connection.query(sql, [request.query.book_id], (copies_err, copies_result) => {
                if (copies_err) {
                  console.log('here 4', copies_err);
                  response.status(500).send(copies_err);
                  connection.end();
                }
                else {
                  if (copies_result.pop().count > issued_result.pop.count) {
                    let sql = "INSERT INTO issues (book_id, user_email, status) VALUES (? , ?, 'ISSUED')";
                    connection.query(sql, [request.query.book_id, request.query.user_email], (insert_err, insert_id) => {
                      if (insert_err) { response.status(500).send(insert_err); }
                      else {
                        response.status(200).send(insert_id);
                        connection.end();
                      }
                    });
                  } else {
                    response.status(200).send({ message: 'No copies available' });
                    connection.end();
                  }
                }
              });
            }
          })
        }
      }
    });
    if (error) { response.sendStatus(500); }
  });
});


// Return book


app.get("/returnBook", (request, response) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
  });
  connection.connect(error => {
    const sql = "SELECT COUNT(id)  as  count FROM issues WHERE book_id = ? AND user_email= ? AND status = 'ISSUED'";
    connection.query(sql, [request.query.book_id, request.query.user_email], (err, results) => {
      if (err) {
        console.log('here 1');
        response.status(500).send(err);
        connection.end();
      }
      else {
        if (results.pop().count > 0) { // this book was already issued to the user.
          console.log('here 2');
          response.status(200).send({ message: 'Already issued' });
          connection.end();
        } else {
          const sql = "SELECT COUNT(id) as count FROM issues WHERE book_id = " + request.query.book_id + " AND (status = 'ISSUED' OR status = 'RENEWED')";
          connection.query(sql, (issued_err, issued_result) => {
            if (issued_err) {
              console.log('here 3', issued_err);
              response.status(500).send(issued_err);
              connection.end();
            }
            else {
              const sql = "SELECT copies FROM books WHERE id = ?";
              connection.query(sql, [request.query.book_id], (copies_err, copies_result) => {
                if (copies_err) {
                  console.log('here 4', copies_err);
                  response.status(500).send(copies_err);
                  connection.end();
                }
                else {
                  if (copies_result.pop().count > issued_result.pop.count) {
                    let sql = "INSERT INTO issues (book_id, user_email, status) VALUES (? , ?, 'ISSUED')";
                    connection.query(sql, [request.query.book_id, request.query.user_email], (insert_err, insert_id) => {
                      if (insert_err) { response.status(500).send(insert_err); }
                      else {
                        response.status(200).send(insert_id);
                        connection.end();
                      }
                    });
                  } else {
                    response.status(200).send({ message: 'No copies available' });
                    connection.end();
                  }
                }
              });
            }
          })
        }
      }
    });
    if (error) { response.sendStatus(500); }
  });
});


//connection.end();

app.listen("8080", () => {
  console.log("Server started on port 8080");
});
