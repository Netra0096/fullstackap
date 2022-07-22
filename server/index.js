const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const mysql = require("mysql2");
const sql = require("mssql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// //mysql
// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Passw0rd",
//   database: "crud_contact",
// });

// app.get("/api/get", (req, res) => {
//   const sqlGet = "select * from contact_db";
//   db.query(sqlGet, (error, result) => {
//     res.send(result);
//   });
// });

//for sql server
var config = {
  user: "sa",
  password: "Passw0rd",
  server: "localhost",
  database: "crud_contact",
  port: 1433,
  dialect: "mssql",
  options: {
    instanceName: "SQLEXPRESS",
    trustedConnection: true,
    enableArithAbort: true,
  },
};

app.get("/api/get", (req, res) => {
  (async () => {
    try {
      let pool = await sql.connect(config);
      const request = pool.request();
      request.query("select * from contact_db", (err, result) => {
        console.dir(result);
      });
    } catch (err) {
      console.log("This is Error");
      console.log(err);
      console.dir(err);
    }
  })();

  sql.on("error", (err) => {
    console.log("This is Error handler");
  });

  // const sqlGet = "select * from contact_db";
  // db.query(sqlGet, (error, result) => {
  //   res.send(result);
  // });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from contact_db where id=?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;

  const sqlUpdate =
    "update contact_db  set name=?, email=?, contact=? where id=?";
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert = "insert into contact_db (name,email,contact) values(?,?,?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log("error", error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "delete from contact_db where id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log("error", error);
    }
  });
});

app.get("/", (req, res) => {
  //   const sqlInsert =
  //     "insert into contact_db (name,email,contact) values('nns','nns@gmail.com','9811220096')";
  //   db.query(sqlInsert, (error, result) => {
  //     console.log("error", error);
  //     console.log("result", result);
  //     res.send("Hello Baby");
  //  });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
