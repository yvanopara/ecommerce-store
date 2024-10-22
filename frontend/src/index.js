import React from 'react';
import  ReactDOM  from 'react-dom'; 
import { BrowserRouter } from 'react-router-dom';
import './index.css' 
import App from'./App';
import { createRoot } from 'react-dom/client';
import StoreContextProvider from './context/StoreContext';



const rootElement = document.getElementById('root'); // Get the root element
const root = createRoot(rootElement); // Create a root using createRoot

root.render(
 <BrowserRouter>
  <StoreContextProvider>
    <App />
  </StoreContextProvider>
</BrowserRouter>
);