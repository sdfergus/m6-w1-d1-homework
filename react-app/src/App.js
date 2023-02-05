import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryList from './InventoryList';
import InventoryEdit from './InventoryEdit';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/inventories' exact element={<InventoryList />} />
          <Route path='/inventories/:id' element={<InventoryEdit />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
