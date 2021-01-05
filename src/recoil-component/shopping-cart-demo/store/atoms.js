// @flow
import { atom } from "recoil";

export const cart = atom({
  default: [],
  key: "cart",
});

export const node = atom({
  default: {},
  key: "node",
});
