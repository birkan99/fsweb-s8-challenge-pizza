import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderForm from "./components/OrderForm";
import SuccessPage from "./components/SuccessPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/order/:id">
          <OrderForm />
        </Route>
        <Route path="/success">
          <SuccessPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
