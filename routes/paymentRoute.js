import express from "express";
import {
  initiatePayment,
} from "../controllers/paymentController.js";
import authCoder from "../middleware/authCoder.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  paymentRequest,
} from "../validations/paymentValidation.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/initiatePayment",
  validateRequest(paymentRequest),
  initiatePayment
);

export default paymentRouter;
