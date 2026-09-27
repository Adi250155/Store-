import express from "express";

import { createProducts,getProducts,updateProducts,deleteProducts } from "../controllers/product.controller.js";

const router =express.Router();

router.get("/",getProducts);
router.get("/",createProducts);
router.get("/:id",updateProducts);
router.get("/:id",deleteProducts);

export default router;