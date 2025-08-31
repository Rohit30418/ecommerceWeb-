import { useState, useEffect } from 'react';
import { doc, deleteDoc, updateDoc, collection, onSnapshot, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import FetchCartItems from './FetchCartItems';
import InnerBanner from '../../common/InnerBanner';

const Cart = () => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [copyCartItems, setCopyCartItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const uid = useSelector(state => state?.user?.userData?.uid);
  const isloggedin = useSelector(state => state?.user?.isLoggedIn);
  const navigate = useNavigate();

    useEffect(() => {
           window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])
  // Load cart: Firestore for logged-in, localStorage for guest
  useEffect(() => {
    if (isloggedin && uid) {
      const cartRef = collection(db, 'users', uid, 'cart');
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCopyCartItems(items);
      });
      return () => unsubscribe();
    } else {
      const guestCart = JSON.parse(localStorage.getItem("cartItem")) || [];
      // Ensure each guest item has tempid
      const cartWithTempId = guestCart.map(item => ({ ...item, tempid: item.tempid || uuidv4() }));
      setCopyCartItems(cartWithTempId);
      localStorage.setItem("cartItem", JSON.stringify(cartWithTempId));
    }
  }, [isloggedin, uid]);

  const localStorageDataUpdate = (items) => {
    localStorage.setItem("cartItem", JSON.stringify(items));
  };

  const placeOrder = async () => {
    if (!uid) {
      localStorage.setItem("guest",JSON.stringify(true));
      navigate("/login");
      return;
    }
    const userRef = doc(db, 'users', uid);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      } else {
        console.log("No such document!");
      }
      setIsCheckOut(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const totalPrice = copyCartItems.reduce((acc, item) => acc + Math.floor(item.price * 80 * item.quantity), 0);

  const deleteCartItem = async (cartItemId) => {
    try {
      if (!isloggedin) {
        const updatedCart = copyCartItems.filter(item => item.tempid !== cartItemId);
        setCopyCartItems(updatedCart);
        localStorageDataUpdate(updatedCart);
      } else {
        const cartItemDocRef = doc(db, 'users', uid, 'cart', cartItemId);
        await deleteDoc(cartItemDocRef);
      }
      toast.success("Item has been deleted successfully");
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 5) return;

    try {
      if (!isloggedin) {
        const updatedCart = copyCartItems.map(item =>
          (item.tempid === cartItemId || item.id === cartItemId)
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCopyCartItems(updatedCart);
        localStorageDataUpdate(updatedCart);
      } else {
        const cartItemDocRef = doc(db, 'users', uid, 'cart', cartItemId);
        await updateDoc(cartItemDocRef, { quantity: newQuantity });
      }
      toast.success("Cart item quantity updated successfully");
    } catch (error) {
      console.error("Error updating cart item quantity: ", error);
    }
  };

  if (copyCartItems.length === 0) {
    return (
      <div className='py-10 text-center dark:text-white'>
        <h1><span className='text-8xl '>&#9785;</span></h1>
        <h1 className='text-2xl font-bold mb-8'> No items available</h1>
        <Link className='bg-brandOrange rounded-md text-white p-4' to="/">Explore Now</Link>
      </div>
    );
  }



  const TotalPages = Math.ceil(copyCartItems.length / 3);


    
  return (
  <div>

  <InnerBanner title="My Cart"></InnerBanner>

    <FetchCartItems></FetchCartItems>
       <div className="flex flex-col my-8 md:flex-row justify-between px-4 md:px-8 gap-6">
      {/* Left Column - Cart Items */}
      <div className="md:w-7/12">
        {!isCheckOut ? (
          <div className="bg-white dark:text-white dark:bg-gray-400/20 shadow-md rounded-lg p-4">
            <h1 className="text-xl font-semibold mb-4">
              <i className='fa fa-shopping-cart'></i> Shopping Cart ({copyCartItems.length})
            </h1>

            {copyCartItems.slice((pageNo - 1) * 3, pageNo * 3).map(item => (
              <div key={item.id || item.tempid} className="flex items-center justify-between p-4 mb-4 border rounded-lg hover:shadow-sm transition">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    onClick={() => updateCartItemQuantity(item.id || item.tempid, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    onClick={() => updateCartItemQuantity(item.id || item.tempid, item.quantity + 1)}
                    disabled={item.quantity >= 5}
                  >+</button>
                </div>
                <p className="font-medium w-24 text-right mr-2">{Math.floor(item.price * 80 * item.quantity)} ₹</p>
                <button onClick={() => deleteCartItem(item.tempid || item.id)} className="text-red-600 hover:text-red-800">
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ))}

            <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition" onClick={placeOrder}>
              Place Order <i className="fas fa-paper-plane"></i>
            </button>

            {/* Pagination */}
            {copyCartItems.length>3 && <div className="flex justify-center items-center mt-6 space-x-2">
              {Array.from({ length: TotalPages }).map((_, ind) => (
                <button
                  key={ind}
                  onClick={() => setPageNo(ind + 1)}
                  className={`px-3 py-1 border rounded ${pageNo === ind + 1 ? 'bg-black text-white' : ''}`}
                >
                  {ind + 1}
                </button>
              ))}
            </div>}
          </div>
        ) : (
          <div className="bg-white dark:text-white dark:bg-gray-400/20 shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-4"><i className="fas fa-cash-register"></i> Checkout</h2>

            <div className="bg-gray-100 dark:bg-gray-100/20 p-4 rounded">
              <h3 className="font-medium text-lg"><i className='fa fa-user'></i> Name</h3>
              <p>{userDetails?.firstName} {userDetails?.lastName}</p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-100/20 p-4 rounded">
              <h3 className="font-medium text-lg"><i className="fas fa-map-marker-alt pr-2"></i> Shipping Address</h3>
              <p>{userDetails?.address}</p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-100/20 p-4 rounded">
              <h3 className="font-medium text-lg"><i className="fas fa-envelope pr-2"></i> Confirmation Email</h3>
              <p>{userDetails?.email}</p>
            </div>

            <div className="flex space-x-4">
              <button onClick={() => setIsCheckOut(false)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Back</button>
              <button
                onClick={() => {
                  navigate("/Payment");
                  localStorage.setItem("totalPrice", totalPrice);
                }}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Order Summary */}
      <div className="md:w-4/12">
        <div className="bg-white dark:bg-gray-400/20 dark:text-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4"><i className="fas fa-receipt pr-2"></i> Order Summary</h2>
          <div className="flex justify-between text-lg mb-2">
            <span>Total Price:</span>
            <span className="font-bold">{totalPrice} ₹</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Delivery Charges:</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Cart;
