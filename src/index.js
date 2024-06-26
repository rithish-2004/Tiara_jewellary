import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Crud from './crud';
import Edit1 from './edit1';
import Editdet from './editdet';
import './index.css';
import MainPage from './mainpage';
import Page1 from './page1';
import reportWebVitals from './reportWebVitals';
import View from './view';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/mainpage", // Corrected path
    element: <MainPage />,
  },
  {
    path: "/page1",
    element: <Page1 />,
  },
  {
    path: "/crud",
    element: <Crud />,
  },
  {
    path: "/customerdetailsview/:id",
    element: <Editdet />,
  },
  {
    path:"/edit1",
    element: <Edit1 />
  },
  {
    path:"/customersee/:id",
    element:<View/>
  }
]);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
