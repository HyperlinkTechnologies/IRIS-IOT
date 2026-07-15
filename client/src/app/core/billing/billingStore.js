const STORAGE_KEY = "iris_billing";

class BillingStore {

  get() {

    return JSON.parse(

      localStorage.getItem(STORAGE_KEY)

    ) || {

      currentPlan: "Industrial",

      status: "Active",

      billingCycle: "Monthly",

      price: 4970,

      nextRenewal: "12 Sep 2026",

      autoRenewal: true,

      validTill: "1 Year",

      lastPayment: 4970,

      currency: "₹",

      usage: {

        devices: 5,
        maxDevices: 30,

        messages: 450000,
        maxMessages: 5000000,

        storage: 1.8,
        maxStorage: 20,

        retention: "6 Months",

      },

      invoices: [

        {

          id: "INV-001",

          date: "15 Jun 2026",

          amount: 4970,

          status: "Paid",

        }

      ]

    };

  }

  save(data) {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(data)

    );

    window.dispatchEvent(

      new Event("billingUpdated")

    );

  }

}

export default new BillingStore();