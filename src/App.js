import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, NavbarBrand} from 'reactstrap';
import RootApp from './containers/RootApp'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar color="light" light expand="md">
              <NavbarBrand href="/">reactstrap</NavbarBrand>
          </Navbar>
        <main>
            <RootApp/>
        </main>
      </div>
    );
  }
}

export default App;
