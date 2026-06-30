import express from 'express';
import {
     getAll,
     getById, 
     create, 
     update, 
     remove 
    } from '../controllers/product.controller.js';

const router = express.Router();

const mid = (req, res, next)=>{
    console.log("get all products mid");
    next();
}

//! CRUD products
//* get all 
router.get("/", mid, mid, getAll);

//* get by id
router.get("/:id",getById);

router.post("/", create);

router.put("/:id",update);

router.delete("/:id", remove);

export default router;