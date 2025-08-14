import React, { useState, Suspense, lazy } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Redux/Store';
import ErrorPage from './ErrorPage';
import UserAuth from './components/UserAuth';
import { LandingMain } from './components/Homeage/Landingmain';
import { DarkColorCom } from './components/DarkColorCom';
import Thanks from './components/Thanks';
import Payment from './components/Payment';
import MyOrder from './components/MyOrder';
import FatchCartItems from './components/FatchCartItems';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import Footer from './components/Footer';
import FatchOrderItems from './components/FatchOrderItems';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader } from '@react-three/drei';

// Lazy-loaded components
const AboutProduct = lazy(() => import('./components/AboutProduct'));
const Login = lazy(() => import('./Login'));
const ProductCategory = lazy(() => import('./components/Product/ProductCategory'));
const Cart = lazy(() => import('./components/Cart/Cart'));

// Layout inside App
const AppLayout = () => {
  return (
    <div className='bg-white dark:bg-darkBg'>
      <Header />
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {

  return (
    <Provider store={store}>
      <ToastContainer theme="colored" />
      <UserAuth />
      <DarkColorCom />
      <FatchCartItems />
      <FatchOrderItems />    

      <div className="w-full">
        <Suspense
          fallback={
            <Loader></Loader>
          }
        >
          <ChatBot />

          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<LandingMain />} />
              <Route path="ProductDetail/:ProductId" element={<AboutProduct />} />
              <Route path="Login" element={<Login />} />
              
              <Route path="ProductCategory/:Category" element={<ProductCategory />}>
                <Route path="ProductDetail/:ProductId" element={<AboutProduct />} />
              </Route>

              <Route path="Register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route path="Order" element={<MyOrder />} />
                <Route path="Cart" element={<Cart />} />
                <Route path="Thanks" element={<Thanks />} />
                <Route path="Payment" element={<Payment />} />
              </Route>

              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
