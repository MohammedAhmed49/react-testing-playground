import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// Custom hook to be used instead of OrderDetails to check if it's created within provider first
export function useOrderDetails() {
  const orderContext = useContext(OrderDetails);

  if (!orderContext) {
    throw new Error("Context must be called within its provider");
  }

  return orderContext;
}

export function OrderDetailsProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = (optionType, itemName, newCount) => {
    const updatedOrders = { ...orderCounts };
    updatedOrders[optionType][itemName] = newCount;

    setOrderCounts(updatedOrders);
  };

  const resetOrder = () => {
    setOrderCounts({
      scoops: {},
      toppings: {},
    });
  };

  const calculateTotal = (optionType) => {
    const counts = Object.values(orderCounts[optionType]);
    const totalCount = counts.reduce((total, current) => total + current, 0);
    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  return (
    <OrderDetails.Provider
      value={(orderCounts, totals, updateItemCount, resetOrder)}
      {...props}
    />
  );
}
