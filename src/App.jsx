import { Suspense, lazy } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Redux/Store';

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

// Lazy-loaded components
const AboutProduct = lazy(() => import('./components/AboutProduct'));
const Login = lazy(() => import('./Login'));
const ProductCategory = lazy(() => import('./components/Product/ProductCategory'));
const Cart = lazy(() => import('./components/Cart/Cart'));

// Layout inside App
const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <UserAuth />
      <DarkColorCom />
      <FatchCartItems />
      <FatchOrderItems/>    
      <div className='w-full'>
        <Suspense fallback={
          <div className='bg-white h-screen flex justify-center items-center'>
            <img src='public/images/loader.gif' style={{ maxWidth: '200px' }} />
          </div>
        }>
          <ChatBot />

          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<LandingMain />} />
              <Route path="ProductDetail/:ProductId" element={<AboutProduct />} />
              <Route path="Login" element={<Login />} />
              <Route path="Cart" element={<Cart />} />
              <Route path="ProductCategory/:Category" element={<ProductCategory />}>
                <Route path="ProductDetail/:ProductId" element={<AboutProduct />} />
              </Route>
              <Route path="Thanks" element={<Thanks />} />
              <Route path="Payment" element={<Payment />} />
              <Route path="Order" element={<MyOrder />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
