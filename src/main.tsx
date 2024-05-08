import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";             
import "./assets/css/demo_1/style.css";
import { Provider } from "react-redux";
import {store} from "../redux/store.ts"
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";      
import { PrimeReactProvider } from "primereact/api";
import axios from 'axios';


const auth  =JSON.parse(localStorage.getItem("admin"))
console.log(auth?.accessToken);


if (auth !== null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.accessToken}`
}

window.axios = axios


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <PrimeReactProvider>    <Provider store={store}><App /> </Provider>
    </PrimeReactProvider>


    
  </React.StrictMode>,
)
