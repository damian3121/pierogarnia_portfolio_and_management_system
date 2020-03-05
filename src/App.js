import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AboutUs } from '../src/content/main/AboutUs'
import { MainPage } from './content/main/MainPage'
import { Offer } from './content/main/Offer'
import { PriceList } from './content/main/PriceList'
import { DrawerMenu } from './component/navigation/DrawerMenu';
import { GalleryPage } from './content/main/GalleryPage';
import { Contact } from './content/main/Contact';
import { Login } from './content/auth/Login';
import { Users } from './content/user/Users';
import { AdminMenuPage } from './content/admin/AdminMenuPage'
import { ProductManager } from './content/productManager/ProductManager'
import { getSessionStorageItem } from './sessionStorageItem/getSessionStorageItem';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/o-nas" component={() => <DrawerMenu pageContent={AboutUs()}></DrawerMenu>} />
        <Route exact path="/oferta" component={() => <DrawerMenu pageContent={Offer()}></DrawerMenu>} />
        <Route exact path="/cennik" component={() => <DrawerMenu pageContent={PriceList()}></DrawerMenu>} />
        <Route exact path="/galeria" component={() => <DrawerMenu pageContent={GalleryPage()}></DrawerMenu>} />
        <Route exact path="/kontakt" component={() => <DrawerMenu pageContent={Contact()}></DrawerMenu>} />
        <Route exact path="/login" component={() => <DrawerMenu pageContent={Login()}></DrawerMenu>} />
        <Route exact path="/users" component={() => <DrawerMenu pageContent={Users()}></DrawerMenu>} />
        <Route exact path="/" component={() => <DrawerMenu pageContent={MainPage()}></DrawerMenu>} />
        {
          getSessionStorageItem('token') && (
            <Fragment>
              <Route exact path="/admin" component={() => <DrawerMenu pageContent={AdminMenuPage()}></DrawerMenu>} />
              <Route exact path="/products" component={() => <DrawerMenu pageContent={ProductManager()}></DrawerMenu>} />
            </Fragment>)
        }
      </Switch>
    </Router>
  )
}

export default App;
