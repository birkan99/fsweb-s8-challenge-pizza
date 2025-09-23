import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import OrderForm from "./components/OrderForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/order/:id">
          <OrderForm />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;