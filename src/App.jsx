import { Suspense, lazy } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import ErrorPage from './pages/ErrorPage';
import UserAuth from './features/auth/UserAuth';
import { LandingMain } from './pages/homeage/Landingmain';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './common/ProtectedRoute';
import Chatbot from './Chatbot';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer';
import Loader from './ui/Loader';

// Lazy-loaded components
const AboutProduct = lazy(() => import('./pages/AboutProduct'));
const Login = lazy(() => import('./features/auth/Login'));
const ProductCategory = lazy(() => import('./components/Product/ProductCategory'));
const Cart = lazy(() => import('./features/cart/Cart'));
const MyOrder=lazy(()=>import('./features/order/MyOrder'));
const Payment=lazy(()=>import('./pages/Payment'));
const Thanks=lazy(()=>import('./pages/Thanks'));
const Register=lazy(()=>import('./features/auth/Register'));
// Layout inside App
const AppLayout = () => {
  return (
    <div className='bg-white dark:bg-darkBg'>
      <Header />
      <main >  
        <Chatbot />
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
      <div className="w-full">
        <Suspense
          fallback={<Loader/>}
        >
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
                <Route path="Thanks" element={<Thanks />} />
                <Route path="Payment" element={<Payment />} />
              </Route>
              <Route path="Cart" element={<Cart />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
