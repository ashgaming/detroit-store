import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'react-bootstrap'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Provider} from 'react-redux'
import store from './store';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <App />
  </Provider>
);

reportWebVitals();
