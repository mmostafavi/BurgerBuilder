import React from "react";
import Layout from "./hoc/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBulder";

function App() {
  return (
    <Layout>
      {" "}
      <BurgerBuilder />{" "}
    </Layout>
  );
}

export default App;
