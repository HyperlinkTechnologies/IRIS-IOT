import request from "./api";

export async function createOrder(planId) {
  return request("/payments/create-order", {
    method: "POST",
    body: JSON.stringify({
      planId,
    }),
  });
}

export async function verifyPayment(data) {
  return request("/payments/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
}