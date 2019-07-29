import React, { Fragment } from 'react';
import './App.css';
import { DrawerMenu } from './component/menu/DrawerMenu';

function App() {
  const style = {
    color: 'black',
    backgroundColor: 'black',
    width: '20px',
    height: '20px'
  }
  return (
    <Fragment>
      <DrawerMenu />
      <div style={style}>ejjj</div>
    </Fragment>
  );
}

export default App;
