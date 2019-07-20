import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBulder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
      </Switch>
    </Layout>
  );
}

export default App;
