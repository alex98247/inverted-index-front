import React from 'react';
import './App.css';
import Finder from './Finder'
import Adder from "./Adder";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
                <Route exact path="/" component={Finder} />
                <Route path="/add" component={Adder} />
        </BrowserRouter>
    </div>
  );
}

export default App;
