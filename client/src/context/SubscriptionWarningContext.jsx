import { createContext, useContext, useState } from "react";

const SubscriptionWarningContext = createContext(null);

export function SubscriptionWarningProvider({ children }) {

  const [warning, setWarning] = useState(null);

  return (
    <SubscriptionWarningContext.Provider
      value={{
        warning,
        setWarning,
        clearWarning: () => setWarning(null),
      }}
    >
      {children}
    </SubscriptionWarningContext.Provider>
  );

}

export function useSubscriptionWarning() {
  return useContext(SubscriptionWarningContext);
}