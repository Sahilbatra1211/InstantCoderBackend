import {
  initiatePaymentService,
} from "../services/paymentService.js";
import { paymentInitiateResponse } from "../validations/paymentValidation.js";

export const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const response = await initiatePaymentService({ bookingId });
    const responseValidation = paymentInitiateResponse.safeParse(response);
    if (!responseValidation.success) {
      console.log(responseValidation.error.errors);
      return res.status(500).json({ errors: responseValidation.error.errors });
    }

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Company update failed" });
  }
};

export const validatePayment = async (req, res) => {
  try {
    console.log(req.params);
    // const { bookingId } = req.params;
    res.status(201).json(req.params);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Company update failed" });
  }
};
