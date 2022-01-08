import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import { CommerceContextProvider } from "./contexts/ComerceContext";
import Chart from "./components/Chart/Chart";
import NewProduct from "./components/NewProduct/NewProduct";
import Payment from "./pages/Payment/Payment";
import Purchases from "./pages/Purchases/Purchases";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <CommerceContextProvider>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/criar-conta" component={CreateAccount} />
          </Switch> 
          <Switch>
            <Route path="/" exact> 
              <Header />
              <Products />
            </Route>
            <Route path={"/meus-produtos"}>
              <Header />
              <Chart />
            </Route>
          </Switch>
          <Switch>
            <Route path={"/upload"} exact>
              <Header />
              <NewProduct /> 
            </Route>
          </Switch>
          <Switch>
            <Route path={"/pagamento"} >
              <Header/>
              <Payment/>
            </Route>
            <Route path={"/compras"}>
              <Header/>
              <Purchases />
            </Route>
          </Switch>
        </CommerceContextProvider> 
      </AuthContextProvider>
    </Router>
  );
}

export default App;