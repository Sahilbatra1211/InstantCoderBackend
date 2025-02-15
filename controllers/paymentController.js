import {
  initiatePaymentService,
} from "../services/paymentService.js";

export const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { orderId } = await initiatePaymentService({ bookingId });
    res.json(orderId); // ✅ Now always returns the `id`
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Company update failed" });
  }
};
