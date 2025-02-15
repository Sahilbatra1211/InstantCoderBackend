import express from "express";
import {
  createRole,
  updateRole,
  getAllRoles,
  getRoleById,
  deleteRole,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/create", createRole);
router.put("/:id", updateRole);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.delete("/:id", deleteRole);

export default router;
