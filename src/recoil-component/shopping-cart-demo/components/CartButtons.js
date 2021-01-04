// @flow
import { useAddItem, useDecreaseItem, useRemoveItem } from "../store";
import PropTypes from "prop-types";
import React from "react";

const CartButtons = ({ item }) => {
  const add = useAddItem();
  const remove = useRemoveItem();
  const decrease = useDecreaseItem();
  return (
    <div className="ui buttons mini">
      <button className="ui button" onClick={() => decrease(item)}>
        -
      </button>
      <button className="ui button positive" onClick={() => add(item)}>
        +
      </button>
      <button className="ui button negative" onClick={() => remove(item)}>
        x
      </button>
    </div>
  );
};

CartButtons.propTypes = {
  item: PropTypes.object,
};

export default CartButtons;
