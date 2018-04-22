import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import RootOrderListApp from './containers/RootOrderListApp'
import {Link, Route, BrowserRouter as Router} from "react-router-dom";
import RootOrderDetail from "./containers/RootOrderDetail";

class App extends Component {
    render() {
        return (
            <div className="container">

                <Router>
                    <div>
                    <Navbar color="light" light expand="sm" className="row justify-content-between">
                        <NavbarBrand href="/">Volo Demo</NavbarBrand>
                        <Nav className="pull-right" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/">Order list</NavLink>

                            </NavItem>
                        </Nav>

                    </Navbar>


                    <hr/>
                    <main>
                        <Route exact path="/" component={RootOrderListApp} />
                        <Route path="/order/:id" component={RootOrderDetail} />
                    </main>
                    </div>
                </Router>


            </div>
        );
    }
}

export default App;
