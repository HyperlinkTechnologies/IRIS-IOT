import Razorpay from "razorpay";
import crypto from "crypto";
import * as paymentRepository from "../repositories/payment.repository.js";
import { BILLING_PLANS } from "../config/billingPlans.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

function generateIrisOrderId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];

  const randomNumbers = Math.floor(1000 + Math.random() * 9000);

  return `IRIS_INV_${randomLetters}${randomNumbers}`;
}

export async function createOrder({
  userId,
  planId,
}) {
  const plan = BILLING_PLANS[planId];

  if (!plan) {
    throw new Error("Invalid billing plan.");
  }

  if (!plan.price?.amount || plan.price.amount <= 0) {
    throw new Error("This plan does not require online payment.");
  }

  const amount = plan.price.amount * 100;
  const currency = plan.price.currency || "INR";
  
  const irisOrderId = generateIrisOrderId();

  const receipt = `IRIS-${userId.slice(0, 8)}-${Date.now()}`;

  
  const order = await razorpay.orders.create({
    amount,
    currency,
    receipt,
    notes: {
      userId,
      planId,
    },
  });

  await paymentRepository.createPayment({
  paymentId: order.id,
  orderId: order.id,
  irisOrderId,
  userId,
  planId,
  amount,
  currency,
  status: "CREATED",
});

  return order;
}

export async function verifyPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(
      `${razorpay_order_id}|${razorpay_payment_id}`
    )
    .digest("hex");

  return expected === razorpay_signature;
}

export async function getRazorpayPayment(paymentId) {
  return razorpay.payments.fetch(paymentId);
}

export const savePayment =
  paymentRepository.createPayment;

export const getPaymentByOrderId =
  paymentRepository.getPaymentByOrderId;