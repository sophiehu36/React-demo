import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import LoginForm from "./components/login";
import RegisterForm from "./components/registerForm";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm}></Route>
                        <Route
                            path="/register"
                            component={RegisterForm}
                        ></Route>
                        <Route
                            path="/movies/:id"
                            component={MovieForm}
                        ></Route>
                        <Route
                            path="/movies/new"
                            component={MovieForm}
                        ></Route>
                        <Route path="/movies" component={Movies}></Route>
                        <Route path="/customers" component={Customers}></Route>
                        <Route path="/rentals" component={Rentals}></Route>
                        <Route path="/not-found" component={NotFound}></Route>
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
