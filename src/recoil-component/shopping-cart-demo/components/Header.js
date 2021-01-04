// @flow
import { cartState } from "../store";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import React from "react";

const Header = () => {
  const { totalQty } = useRecoilValue(cartState);
  return (
    <div className="header">
      <div>
        <Link to="/">
          <h1>My Store</h1>
        </Link>
      </div>
      <div>
        <Link className="ui button primary" to="cart">
          Cart: {totalQty}
        </Link>
      </div>
    </div>
  );
};

export default Header;
