// @flow
import { cart, currentTableID } from "./atoms";
import { myDBQuery } from "../../../utils/my-db-mock-query-component";
import { selector, selectorFamily, useRecoilState } from "recoil";

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

// node info query proxy
export const currentTableInfoQuery = selectorFamily({
  get: (tableID) => async () => {
    const response = await myDBQuery({
      userID: tableID,
    });
    if (response.error) {
      throw response.error;
    }
    return response;
  },
  key: "currentTableInfoQuery",
});
