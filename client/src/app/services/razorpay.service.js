import {
  createOrder,
  verifyPayment,
} from "./payment.service";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export async function startRazorpayPayment(plan) {
  const loaded = await loadRazorpayScript();

  if (!loaded) {
    throw new Error(
      "Razorpay Checkout could not be loaded."
    );
  }

  const response = await createOrder(plan.id);

  if (!response?.success || !response?.order) {
    throw new Error(
      response?.message ||
      "Unable to create Razorpay order."
    );
  }

  const { order, key } = response;

  return new Promise((resolve, reject) => {
    const options = {
      key,

      amount: order.amount,

      currency: order.currency,

      name: "IRIS IoT Platform",

      description: `${plan.name} Subscription`,

      order_id: order.id,

      handler: async function (paymentResponse) {
        try {
          const verification =
            await verifyPayment({
              razorpay_order_id:
                paymentResponse.razorpay_order_id,

              razorpay_payment_id:
                paymentResponse.razorpay_payment_id,

              razorpay_signature:
                paymentResponse.razorpay_signature,
            });

          if (!verification?.success) {
            reject(
              new Error(
                verification?.message ||
                "Payment verification failed."
              )
            );

            return;
          }

          resolve(verification);
        } catch (error) {
          reject(error);
        }
      },

      modal: {
        ondismiss: function () {
          reject(
            new Error("Payment cancelled.")
          );
        },
      },

      theme: {
        color: "#ff5700",
      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();
  });
}