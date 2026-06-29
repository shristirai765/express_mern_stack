import express from 'express';
import {
     getAll,
     getById, 
     create, 
     update, 
     remove 
    } from '../controllers/product.controller.js';

const router = express.Router();


//! CRUD products
//* get all 
router.get("/", getAll);

//* get by id
router.get("/:id",getById);

router.post("/", create);

router.put("/:id",update);

router.delete("/:id", remove);

export default router;