import { createContext, useContext, useEffect, useState } from "react";
import billingService from "../app/services/billingService";
import { PlansModal } from "../app/components/Billing/billingModals";

const BillingContext = createContext(null);

export function BillingProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plansOpen, setPlansOpen] = useState(false);

 useEffect(() => {
  let intervalId;

  async function loadInitialBilling() {
    try {

      const [plansData, subscription] = await Promise.all([
        billingService.getPlans(),
        billingService.getSubscription(),
      ]);

      setPlans(plansData);
      setBilling(subscription);

      // Refresh usage/subscription every 5 seconds
      intervalId = setInterval(async () => {
        try {
          const updatedSubscription =
            await billingService.getSubscription();

          setBilling(updatedSubscription);
        } catch (error) {
          console.error(
            "Failed to refresh billing usage:",
            error
          );
        }
      }, 5000);
    } catch (err) {
      console.error("BillingProvider Error:", err);
    } finally {
      setLoading(false);
    }
  }

  loadInitialBilling();

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}, []);

  const value = {
    loading,
    plans,
    billing,
    openPlansModal: () => setPlansOpen(true),
    closePlansModal: () => setPlansOpen(false),
  };


  return (
    <BillingContext.Provider value={value}>
      {children}

      {billing && (
        <PlansModal
          plans={plans}
          billing={billing}
          open={plansOpen}
          onClose={() => setPlansOpen(false)}
        />
      )}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);

  console.log("useBilling:", context);

  return context;
}