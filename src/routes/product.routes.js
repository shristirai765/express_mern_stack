import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/user.conroller.js';

const router = express.Router();


//! CRUD products
//* get all 
router.get("/", getAll);

//* get by id
router.get("/:id",getById);

router.post("/", );

router.put("/:id",update);

router.delete("/:id", remove);

export default router;