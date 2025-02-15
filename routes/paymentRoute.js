import express from "express";
import {
  initiatePayment,
  validatePayment
} from "../controllers/paymentController.js";
import authCoder from "../middleware/authCoder.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  paymentInitiateRequest,
} from "../validations/paymentValidation.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/initiatePayment",
  validateRequest(paymentInitiateRequest),
  initiatePayment
);

// TODO: Add validation logic here
paymentRouter.post(
  "/validate",
  validatePayment
);

export default paymentRouter;
