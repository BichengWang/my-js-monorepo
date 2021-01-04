// @flow
import { cart } from "./atoms";
import { selector } from "recoil";

export const cartState = selector({
  get: ({ get }) => {
    const totalCost = get(cart).reduce((a, b) => a + b.price * b.qty, 0);
    const totalQty = get(cart).reduce((a, b) => a + b.qty, 0);
    return {
      totalCost,
      totalQty,
    };
  },
  key: "cartState",
});
