import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Memory from './components/Memory/Memory';
import Pendu from './components/Pendu/Pendu';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/memory" exact component={Memory} />
        <Route path="/pendu" exact component={Pendu} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
