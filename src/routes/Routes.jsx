import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Search from "../pages/Search";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:id" component={Product} />
      <Route path="/product/:id" component={Catalog} />
      <Route path="/search/:id" component={Search} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};

export default Routes;
