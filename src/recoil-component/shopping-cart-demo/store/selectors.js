// @flow
import { cart, currentTableID, tableFilter } from "./atoms";
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
export const tableInfoQueryFamily = selectorFamily({
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

export const filterCurrentTableRecord = selector({
  get: ({ get }) => {
    const tableInfoQuery = get(tableInfoQueryFamily(get(currentTableID)));
    const tableFilterValue = get(tableFilter);

    if (tableInfoQuery.records && tableInfoQuery.records.length) {
      const result = tableInfoQuery.records.filter(
        ({record}) => record.includes(tableFilterValue.trim()) && record
      );
      console.log("filtered result, ", JSON.stringify(result));
      return result;
    }
    return tableInfoQuery;
  },
  key: "filterCurrentTableRecord",
});
