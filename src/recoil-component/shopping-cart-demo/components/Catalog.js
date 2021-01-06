// @flow
import { cart, currentTableID } from "../store/atoms";
import { myDBQuery } from "../../../utils/my-db-mock-query-component";
import { tableInfoQueryFamily, useAddItem, useAddRecord } from "../store";
import {
  useRecoilCallback,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import React, { useEffect } from "react";

const ids = [
  "apple",
  "orange",
  "pear",
  "tomato",
  "watermelon",
  "guava",
  "mango",
  "avacado",
  "lime",
  "lemon",
  "kiwi",
];

const products = ids.map((id, index) => ({ id, price: index + 1 }));

function RefreshTableInfo() {
  const nodeValue = useRecoilValue(currentTableID);
  const refreshUserInfo = useRecoilCallback(
    ({ set }) => async () => {
      const response = await myDBQuery({ nodeValue });
      set(tableInfoQueryFamily, response);
    },
    [nodeValue]
  );

  useEffect(() => {
    const intervalID = setInterval(refreshUserInfo, 1000);
    return () => clearInterval(intervalID);
  }, [refreshUserInfo]);

  return null;
}

const MyNode = () => {
  const nodeInfoQuery = useRecoilValue(tableInfoQueryFamily);
  const addRecord = useAddRecord();
  return (
    <div>
      {nodeInfoQuery.records.map((record, index) => (
        <div className="record" key={record.id}>
          <h4>
            {record.id} + {record.value}
          </h4>
          <button
            className="ui button positive mini"
            onClick={() => {
              addRecord("new row value");
            }}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

const Catalog = () => {
  const addItem = useAddItem();
  return (
    <div>
      <div className="catalog">
        <div className="products">
          {products.map((p) => (
            <div className="product" key={p.id}>
              <h4>
                {p.id} / ${p.price}
              </h4>
              <button
                className="ui button positive mini"
                onClick={() => addItem(p)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="catalog2">
          <div className="products2">
            {/*<button*/}
            {/*	className="ui button positive mini"*/}
            {/*	onClick={RefreshTableInfo}*/}
            {/*>Refresh Node</button>*/}
            <React.Suspense fallback={<div>Loading...</div>}>
              <MyNode />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
