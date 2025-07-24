import { Router } from "express";
import customerController from "../controllers/customerController";

const router = Router();

router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomer);
router.post("/", customerController.addCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;