import prisma from "../config/prismaClient.js";
import { getAuditFields } from "../utils/prismaUtils.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: "rzp_test_UEK04GSAOYtkKo",
  key_secret: "lOTKrpsj4lJzyYmbwKmw8hFB",
});

export const initiatePaymentService = async (data) => {
  try {
    const { bookingId } = data;

    // Fetch booking details (assuming amount comes from booking)
    // const booking = await prisma.booking.findUnique({
    //   where: { id: bookingId },
    // });
    // if (!booking) throw new Error("Booking not found");
    const bookingAmount = 100;
    const amount = bookingAmount * 100; // Convert to smallest currency unit (paise)

    // Create order on Razorpay
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${bookingId}`,
      notes: {
        bookingId,
      },
    });


    // Save order details in the payment table
    await prisma.payment.create({
      data: {
        order_id_from_gateway: order.id,
        amount: bookingAmount,
        status: 'PENDING', // replace with enum
      },
    });
    console.log(order)
    return { orderId: order.id, amount: amount, currency: "INR" };
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Failed to initiate payment");
  }
};
