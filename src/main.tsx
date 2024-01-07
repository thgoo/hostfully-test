import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IndexPage from './pages/HomePage.tsx';
import './globals.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
