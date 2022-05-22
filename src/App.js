import React, { Component } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarComponent from './Component/NavbarComponent';
import { Home, Sukses } from './Pages/Index';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sukses" element={<Sukses />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
