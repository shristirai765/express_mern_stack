import http from "http";
import express from "express";

// send - express method 
//* creating express app instance
const app = express();

const users = [];
const products = [];

//* creating http server
const server = http.createServer(app);

app.use(express.json()); // parses the json data into object and attach it into the req body
//? or to read data of request body

//* home  -> get, / => homepage
// app.get(path, handler);
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

//! CRUD users
//* get all users
app.get("/users", (req, res) =>{
    // res.send("<h1>Users Page</h1>");
    // const query = req.query;
    // console.log(query);
    res.json({
        message : "all users fetched",
        success: true,
        data: users,
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

    const {id} = req.params;

    const user = users.find((user)=> user._id === Number(id));

    if(!user){
        res.json({
            message : `user not found `,
            success: false,
            data: null
        });
        return;
    }
    res.json({
            message : `user fetched by {id} `,
            success: true,
            data: user
        });


});

//* create
app.post("/users", (req, res) =>{
    // res.send("<h1>Users created</h1>");
    // console.log(req.body);

    const {name, email, password} = req.body;
    users.push({
        name,
        email,
        password,
        createdAt: Date.now(),
        _id: users.length + 1 ,
    })
    res.json({
        message : "user created",
        success: true,
        data: users[users.length-1]
    });
});

//* update
app.put("/users/:id", (req, res) =>{
    // res.send("<h1>Users updated</h1>");

    const {id} = req.params;

    const {name, email, password} = req.body;
    
    const index = users.findIndex((user)=> user._id === Number(id));

    if(index === -1){
        res.json({
            message: "user not found",
            success: "false",
            data: null
        });
        return;
    }

    users[index] = {
        ...users[index],
        name,
        email,
        password
    };
    res.json({
        message : "user updated",
        success: true,
        data: users[index]
    });
});

//* delete
app.delete("/users/:id", (req, res) =>{
    // res.send("<h1>Users deleted</h1>");

    const id = req.params.id;

    const index = users.findIndex((user)=> user._id === Number(id));

    if(index === -1){
        res.json({
            message: "user not found",
            success: false,
            data: null
        });
        return;
    }
    users.splice(index, 1);
    res.json({
        message : "user deleted",
        success: true,
        data: null
    });
});

//! CRUD products
//* get all 
app.get("/products", (req, res) =>{
    // res.send("<h1>All products</h1>");
    res.json({
        message : "all products",
        success: true,
        data: products,
    });
});

//* get by id
app.get("/products/:id", (req, res) =>{
    // res.send("<h1>All products</h1>");

    const {id} = req.params;
    const product = products.find((product)=> product._id === Number(id));

    if(!product){
        res.json({
            message : `product not found `,
            success: false,
            data: null
        });
        return;
    }
    res.json({
            message : `product fetched by {id} `,
            success: true,
            data: product
        });
    
});

app.post("/products", (req, res) =>{
    // res.send("<h1>Products created</h1>");
    const {name, brand, price} = req.body;
    products.push({
        name,
        brand,
        price,
        createdAt: new Date(Date.now()),
        _id: products.length+1,

    })
    res.json({
        message : "products created",
        success: true,
        data:products[products.length-1]
    });
});

app.put("/products/:id", (req, res) =>{
    // res.send("<h1>Products updated</h1>");
    const {id} = req.params;
    console.log(id)

    const {name, brand, price} = req.body;
    
    const index = products.findIndex((product)=>product._id=== Number(id));
    console.log(index);

    if(index === -1){
        res.json({
            message: "product not found",
            success: "false",
            data: null
        });
        return;
    }

    products[index]={
        ...products[index],
        name,
        brand,
        price
    };
    res.json({
        message : "products updated",
        success: true,
        data: products[index]
    });
});

app.delete("/products/:id", (req, res) =>{
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


// http://localhost:8080/users/1?name="John"&page=1&limit=10
//? http - protocol
//? //localhost:8080 - domain name
//? /users/1 - route
//? ?name= "" - query

//req.url
// req.parmas ->{}
// req.query ->{name:"John",page=1&limit=10}
//? ? paxi, & separator
//req.body -> {}
