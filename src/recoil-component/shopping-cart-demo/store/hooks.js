// @flow
import {
  cart,
  currentTableID,
  recordAtomFamily,
  tableAtomFamily,
} from "./atoms";
import { tableInfoQueryFamily } from "./selectors";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useSetRecoilState,
} from "recoil";
import React from "react";

const cloneIndex = (items, id) => ({
  clone: items.map((item) => ({ ...item })),
  index: items.findIndex((item) => item.id === id),
});

export const useAddItem = () => {
  const [items, setItems] = useRecoilState(cart);
  return (product) => {
    const { clone, index } = cloneIndex(items, product.id);
    if (index !== -1) {
      clone[index].qty += 1;
      setItems(clone);
    } else {
      setItems([...clone, { ...product, qty: 1 }]);
    }
  };
};

export const useRemoveItem = () => {
  const [items, setItems] = useRecoilState(cart);
  return (product) => {
    setItems(items.filter((item) => item.id !== product.id));
  };
};

export const useDecreaseItem = () => {
  const [items, setItems] = useRecoilState(cart);
  const removeItem = useRemoveItem();
  return (product) => {
    const { clone, index } = cloneIndex(items, product.id);
    if (clone[index].qty === 1) {
      removeItem(product);
    } else {
      clone[index].qty -= 1;
      setItems(clone);
    }
  };
};

export const useAddRecord = () => {
  const [table, setTable] = useRecoilState(tableInfoQueryFamily);
  return (newRecord) => {
    console.log("table.records, ", JSON.stringify(table));
    if (table.records) {
      setTable({
        records: [
          ...table.records.map((item) => ({ ...item })),
          { id: "new", value: newRecord },
        ],
      });
      // setTable({
      //   records: [...table.records, {id: "new", value: newRecord}],
      // });
    }
  };
};

export const useSetRecords = ({ id }) => {
  const setRecord = useSetRecoilState(recordAtomFamily(id));
  return (recordsVal) => {
    setRecord(recordsVal);
  };
};

export const useSetTable = (tableID) => {
  const setTable = useSetRecoilState(tableAtomFamily(tableID));
  return ({ recordIDs }) =>
    setTable({
      records: recordIDs,
      tableID: tableID,
    });
};
