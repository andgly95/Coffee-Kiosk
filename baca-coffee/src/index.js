import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App.js';
import Welcome from './components/welcome';
import ConfirmationScreen from './components/confirmationScreen';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path='/order' component={App} />
      <Route path='/' component={Welcome} />
      {/* <Route path='/confirm' render={(props) => <ConfirmationScreen {...props}/>}/> */}
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
