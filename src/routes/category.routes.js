 import express from "express";
 import {
    getAll,
    getById,
    create,
    update,
    remove
  } from "../controllers/category.controller.js";

  const router = express.Router();

  //* getAll
  router.get("/",getAll);

  //* getById
  router.get("/:id", getById);

  //* create
  router.post("/", create);

  //* update
  router.put("/:id", update);

  //* delete
  router.put("/:id", remove);

  export default router;