import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Clientes from "./component/clientes/Clientes";
import Ordenes from "./component/ordenes/Ordenes";
import Orden from "./component/ordenes/Orden";

function App() {


  return (
    <Router>
        <Header />
        <Route path="/orden/:id" component={Orden}/>
        <Route path="/clientes" component={Clientes}/>
        <Route path="/ordenes" component={Ordenes}/>
      
    </Router>
  );
}

export default App;
