import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AboutUs } from '../src/content/main/AboutUs'
import { Offer } from '../src/content/main/Offer'
import { DrawerMenu } from './component/menu/DrawerMenu';

function App() {
  return (
    <Router>
      <Route path="/o-nas" component={() => <DrawerMenu pageContent={AboutUs()}></DrawerMenu>} />
      <Route path="/oferta" component={() => <DrawerMenu pageContent={Offer()}></DrawerMenu>} />
    </Router>
  )
}

export default App;
