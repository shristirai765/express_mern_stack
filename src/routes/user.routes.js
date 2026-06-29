import express from 'express';
import { getAll, getById, create, update, del } from '../controllers/user.conroller.js';

const router = express.Router();

const users = [];

//! CRUD users
//* get all users
router.get("/", getAll);

//* get by id
//? routes param - users/:id/:postid
//? for dynamic -> : (colon)

// /users/12 => {id: 12}
// /users/1 => {id: 1}

router.get("/:id",getById);

//* create
router.post("/", create);

//* update
router.put("/:id",update);

//* delete
router.delete("/:id", del);

export default router;