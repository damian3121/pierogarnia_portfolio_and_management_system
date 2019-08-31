import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AboutUs } from '../src/content/main/AboutUs'
import { MainPage } from './content/main/MainPage'
import { Offer } from './content/main/Offer'
import { PriceList } from './content/main/PriceList'
import { DrawerMenu } from './component/navigation/DrawerMenu';
import { GalleryPage } from './content/main/GalleryPage';
import { Contact } from './content/main/Contact';

function App() {
  return (
    <Router>
        <Route path="/o-nas" component={() => <DrawerMenu pageContent={AboutUs()}></DrawerMenu>} />
        <Route path="/oferta" component={() => <DrawerMenu pageContent={Offer()}></DrawerMenu>} />
        <Route exact path="/cennik" component={() => <DrawerMenu pageContent={PriceList()}></DrawerMenu>} />
        <Route exact path="/galeria" component={() => <DrawerMenu pageContent={GalleryPage()}></DrawerMenu>} />
        <Route exact path="/kontakt" component={() => <DrawerMenu pageContent={Contact()}></DrawerMenu>} />
        <Route exact path="/" component={() => <DrawerMenu pageContent={MainPage()}></DrawerMenu>} />
    </Router>
  )
}

export default App;
