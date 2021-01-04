// @flow
import { RecoilRoot } from "recoil";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Catalog from "./components/Catalog";
import Header from "./components/Header";
import React from "react";

const ShoppingCart = () => {
  return (
    <RecoilRoot>
      <Router basename="/">
        <Header />
        <Switch>
          <Route component={Catalog} exact path="/" />
          <Route component={Cart} path="/cart" />
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default ShoppingCart;
