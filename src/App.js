import React from 'react';
import List from './components/List'
import { MDBNavbar, MDBNavbarBrand, MDBIcon } from 'mdbreact'
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        <MDBNavbar color="indigo" dark expand="md">
          <MDBNavbarBrand>
            <h1 className="white-text pl-5"><MDBIcon icon="ticket-alt" /> Ticket Master</h1>
          </MDBNavbarBrand>
        </MDBNavbar>
        <div className="App">
            <List />
        </div>
    </BrowserRouter>
  );
}

export default App;
