import express from 'express';

const router = express.Router();

const users = [];

//! CRUD users
//* get all users
router.get("/", (req, res) =>{
    // res.send("<h1>Users Page</h1>");
    // const query = req.query;
    // console.log(query);
    res.status(200).json({
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

router.get("/:id", (req, res) =>{
    // res.send("<h1>Users Page</h1>");
    // req.params => {id: 123}
    // console.log(req.params);
    // /post/:userId/:postId => /post/1/2 {userId:1, postId:2}

    const {id} = req.params;

    const user = users.find((user)=> user._id === Number(id));

    if(!user){
        res.status(404).json({
            message : `user not found `,
            success: false,
            data: null
        });
        return;
    }
    res.status(200).json({
            message : `user fetched by {id} `,
            success: true,
            data: users
        });


});

//* create
router.post("/", (req, res) =>{
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
    res.status(201).json({
        message : "user created",
        success: true,
        data: users[users.length-1]
    });
});

//* update
router.put("/:id", (req, res) =>{
    // res.send("<h1>Users updated</h1>");

    const {id} = req.params;

    const {name, email, password} = req.body;
    
    const index = users.findIndex((user)=> user._id === Number(id));

    if(index === -1){
        res.status(404).json({
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
    res.status(200).json({
        message : "user updated",
        success: true,
        data: users[index]
    });
});

//* delete
router.delete("/:id", (req, res) =>{
    // res.send("<h1>Users deleted</h1>");

    const id = req.params.id;

    const index = users.findIndex((user)=> user._id === Number(id));

    if(index === -1){
        res.status(404).json({
            message: "user not found",
            success: false,
            data: null
        });
        return;
    }
    users.splice(index, 1);
    res.status(200).json({
        message : "user deleted",
        success: true,
        data: null
    });
});

export default router;