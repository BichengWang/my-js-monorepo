// @flow
import { useAddItem } from "../store";
import React from "react";
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

const Catalog = () => {
  const addItem = useAddItem();
  return (
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
  );
};

export default Catalog;
