import http from "http";
import express from "express";

// send - express method 
//* creating express app instance
const app = express();


//* creating http server
const server = http.createServer(app);

//* home  -> get, / => homepage
// app.get(path, handler);
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

//! CRUD users
//* get all users
app.get("/users", (req, res) =>{
    // res.send("<h1>Users Page</h1>");
    res.json({
        message : "all users",
        success: true,
        data:[{
            _id: 1,
            name: "John Doe",
            email: "j@gmail.com"

        },
        {
            _id: 2,
            name: "John",
            email: "jj@gmail.com"
        }
    ]
    });
});
//* get by id
//? routes param - users/:id/:postid
//? for dynamic -> : (colon)

// /users/12 => {id: 12}
// /users/1 => {id: 1}

app.get("/users/:id", (req, res) =>{
    // res.send("<h1>Users Page</h1>");
    // req.params => {id: 123}
    // console.log(req.params);
    // /post/:userId/:postId => /post/1/2 {userId:1, postId:2}

    const id = req.params.id;

    res.json({
        message : `users fetched by id  `,
        success: true,
        data:[{
            _id: 1,
            name: "John Doe",
            email: "j@gmail.com"

        },
        {
            _id: 2,
            name: "John",
            email: "jj@gmail.com"
        }
    ]
    });
});

//* create
app.post("/users", (req, res) =>{
    // res.send("<h1>Users created</h1>");
    res.json({
        message : "user created",
        success: true,
        data:{
            _id: 3,
            name: "Lucy",
            email: "l@gmail.com"

        }
    });
});

//* update
app.put("/users/:id", (req, res) =>{
    // res.send("<h1>Users updated</h1>");

    const id = req.params.id;

    res.json({
        message : "user updated",
        success: true,
        data:{
            _id: 1,
            name: "John Doe update",
            email: "j@gmail.com"

        }
    });
});

//* delete
app.delete("/users/:id", (req, res) =>{
    // res.send("<h1>Users deleted</h1>");

    const id = req.params.id;

    res.json({
        message : "user deleted",
        success: true,
        data: null
    });
});

//! CRUD products

app.get("/products", (req, res) =>{
    // res.send("<h1>All products</h1>");
    res.json({
        message : "all products",
        success: true,
        data:{
            _id: 1,
            name: "Shoes"

        }
    });
});

app.post("/products", (req, res) =>{
    // res.send("<h1>Products created</h1>");
    res.json({
        message : "products created",
        success: true,
        data:{
            _id: 2,
            name: "Stationary"

        }
    });
});

app.put("/products", (req, res) =>{
    // res.send("<h1>Products updated</h1>");
    res.json({
        message : "products updated",
        success: true,
        data:{
            _id: 2,
            name: "School material"

        }
    });
});

app.delete("/products", (req, res) =>{
    // res.send("<h1>Products deleted</h1>");
    res.json({
        message : "products deleted",
        success: true,
        data: null
    });
});

//
server.listen(8080, "localhost", ()=>{
    //127.0.0.1- localhost
    console.log(`server is running at http://localhost:8080`); //ip address + port
    console.log("press ctrl+c to close the server");
});

//? expressJs / nestjs
//? opiniated - strict, must follow rules
// one req one handler
// get /users ->handler

//middleware - function
// by default handles error