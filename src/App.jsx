import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import ProtectedAuth from './ProtectedRoutes/ProtectedAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import AllOrders from './Components/AllOrders/AllOrders';
import CheckOut from './Components/CheckOut/CheckOut';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import "./api/publicApi.js"

function App() {
  const queryClient = new QueryClient()
  const routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "productDetails/:id", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "categoryDetails/:id", element: <ProtectedRoutes><CategoryDetails /></ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: "login", element: <ProtectedAuth><Login /></ProtectedAuth> },
        { path: "register", element: <ProtectedAuth><Register /></ProtectedAuth> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={routes}></RouterProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
