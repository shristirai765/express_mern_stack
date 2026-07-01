import mongoose, { connect } from "mongoose";

// const users = [];

//! user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
},{timestamps: true});

//! creating user model (reference for crud too)
const User = mongoose.model("user", userSchema);


export const getAll = async (req, res, next) =>{
    // res.send("<h1>Users Page</h1>");
    try{
        const query = req.query;
        console.log(query);

        //* database find all query
        const user = await User.find({});

        res.status(200).json({
        message : "all users fetched",
        success: true,
        data: users,
        });
    }catch(error){
        next(error);
    }
}

export const getById = async (req, res, next) =>{
    // res.send("<h1>Users Page</h1>");
    // req.params => {id: 123}
    // console.log(req.params);
    // /post/:userId/:postId => /post/1/2 {userId:1, postId:2}

    try{
        const {id} = req.params;

        // const user = users.find((user)=> user._id === Number(id));

        const user = await User.findOne({_id: id});

        if(!user){
            // res.status(404).json({
            //     message : `user not found `,
            //     success: false,
            //     data: null
            // });
            next({
                message : `user not found `,
                statusCode: 404
            });
            return;
        }
        res.status(200).json({
                message : `user fetched by {id} `,
                success: true,
                data: users
            })
    }catch (error){
        next(error);
    }
    


};

export const create = async (req, res, next) =>{
    // res.send("<h1>Users created</h1>");
    // console.log(req.body);

   try{
        const {name, email, password} = req.body;
        if(!name){
            next({
                message: "name required",
                statusCode: 400
            });
            return;
        }
        if(!email){
            next({
                message: "email required",
                statusCode: 400
            });
            return;
        }
        if(!password){
            next({
                message: "password required",
                statusCode: 400
            });
            return;
        }
        const newUser = await User.create({name,email, password});
        // users.push({
        //     name,
        //     email,
        //     password,
        //     createdAt: Date.now(),
        //     _id: users.length + 1 ,
        // })
        res.status(201).json({
            message : "user created",
            success: true,
            data: newUser
        });
   }catch(error){
    next(error);
   }

};

export const update = async (req, res, next) =>{
    // res.send("<h1>Users updated</h1>");

    try{
        const {id} = req.params;

        const {name, email, password} = req.body;
        
        // const index = users.findIndex((user)=> user._id === Number(id));

        const updatedUser = await User.findByIdAndUpdate({_id: id}, {name, email, password});

        if(!updatedUser){
            return next({
                message: " user not found",
                statusCode: 404
            });
        }
        // if(index === -1){
            // res.status(404).json({
            //     message: "user not found",
            //     success: "false",
            //     data: null
            // });
            // return;
        //     next({
        //         message: " user not found",
        //         statusCode: 404
        //     });
        // }

        // users[index] = {
        //     ...users[index],
        //     name,
        //     email,
        //     password
        // };
        res.status(200).json({
            message : "user updated",
            success: true,
            data: updatedUser
        });
    }catch(error){
        next(error);
    }
};

export const del = async (req, res, next) =>{
    // res.send("<h1>Users deleted</h1>");

    try{
        const {id} = req.params;

        // const index = users.findIndex((user)=> user._id === Number(id));
        const deletedUser = await User.findByIdAndDelete({_id: id})

        if(!deletedUser){
            // res.status(404).json({
            //     message: "user not found",
            //     success: false,
            //     data: null
            // });
            // return;
            next({
                message: " user not found",
                statusCode: 404
            });
            return;
        }
        // users.splice(index, 1);
        res.status(200).json({
            message : "user deleted",
            success: true,
            data: null
        });
    }catch(error){
        next(error);
    }
};
