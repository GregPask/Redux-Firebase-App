import React, { Component } from 'react';
import { BrowserRouter , Switch, Route} from "react-router-dom";


// Css File
import "./Css/app.scss";

// Js Files
import Home from "./Js/Home";
import Navbar from "./Js/Navbar";
import Login from "./Js/Login";
import Signup from "./Js/Signup";
import Dashboard from "./Js/Dashboard";
import Default from "./Js/Default";
import Footer from "./Js/Footer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
       
    

      <Switch>
        <Route exact path="/" component ={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={Default} />
      </Switch>

      <Footer />

      </div>
      </BrowserRouter>

    );
  }
}

export default App;
