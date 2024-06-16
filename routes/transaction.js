import express from "express";
import TransactionController from "../controllers/Transaction.js";


const router = new express.Router();

router.get("/getall", TransactionController.getAll);
router.get("/getOne/:id", TransactionController.getOne);
router.post("/create", TransactionController.create);
router.delete("/delete/:id", TransactionController.delete);

export default router;
