// @flow
import { cart, node } from "../store/atoms";
import { myDBQuery } from "../../../utils/my-db-mock-query-component";
import { nodeInfoQuery, useAddItem, useAddRecord } from "../store";
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

function RefreshTableInfo({ userID }) {
  const refreshUserInfo = useRecoilCallback(
    ({ set }) => async (id) => {
      const userInfo = await myDBQuery({ userID });
      set(node, userInfo);
    },
    [userID]
  );

  useEffect(() => {
    const intervalID = setInterval(refreshUserInfo, 1000);
    return () => clearInterval(intervalID);
  }, [refreshUserInfo]);

  return null;
}

function displayNode(node, addRecord) {
  return (
    <div>
      {node.records &&
        node.records.map((record, index) => (
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
}

const MyNode = () => {
  const nodeInfoQueryLoadable = useRecoilValueLoadable(nodeInfoQuery());
  const addRecord = useAddRecord();
  switch (nodeInfoQueryLoadable.state) {
    case "hasValue":
      console.log(
        "nodeInfoQueryLoadable.contents",
        JSON.stringify(nodeInfoQueryLoadable.contents)
      );
      return displayNode(nodeInfoQueryLoadable.contents, addRecord);
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      throw nodeInfoQueryLoadable.contents;
  }
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
            <MyNode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
