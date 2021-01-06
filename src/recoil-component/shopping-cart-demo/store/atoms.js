// @flow
import { atom, atomFamily } from "recoil";

export const cart = atom({
  default: [],
  key: "cart",
});

export const currentTableID = atom({
  default: "node1",
  key: "tableID",
});

export const recordAtomFamily = atomFamily({
  default: "one not initialed record",
  key: "recordAtomFamily",
});

export const tableAtomFamily = atomFamily({
  default: { records: [] },
  key: "tableAtomFamily",
});
