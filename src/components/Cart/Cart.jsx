import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const uid = useSelector((state) => state?.user?.userid);
  const cartItems = useSelector((state) => state?.user?.myCart);
  const [pageNo, setPageNo] = useState(1);
  const navigate = useNavigate();

  console.log(cartItems)

  const placeOrder = async () => {
    const userRef = doc(db, 'users', uid);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
    setIsCheckOut(true);
  };

  const totalPrice = cartItems?.reduce((acc, item) => acc + Math.floor(item.price * 80 * item.quantity), 0);
  const totalPages = Math.ceil(cartItems.length / 10);

  const deleteCartItem = async (cartItemId) => {
    try {
      const cartItemDocRef = doc(db, 'users', uid, 'cart', cartItemId);
      await deleteDoc(cartItemDocRef);
      console.log('Cart item deleted successfully');
    } catch (error) {
      console.error('Error deleting cart item: ', error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 5) return;
    try {
      const cartItemDocRef = doc(db, 'users', uid, 'cart', cartItemId);
      await updateDoc(cartItemDocRef, { quantity: newQuantity });
      console.log('Cart item quantity updated successfully');
    } catch (error) {
      console.error('Error updating cart item quantity: ', error);
    }
  };

  return (
    <>

      <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-6 gap-6">
        {/* Left Column - Cart Items */}
        <div className="md:w-7/12">
          {!isCheckOut ? (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h1 className="text-3xl font-semibold mb-4">Shopping Cart ({cartItems.length})</h1>
              {cartItems.slice((pageNo - 1) * 10, pageNo * 10).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 mb-4 border rounded-lg hover:shadow-sm transition">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 border rounded disabled:opacity-50"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded disabled:opacity-50"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 5}
                    >+</button>
                  </div>
                  <p className="font-medium w-24 text-right mr-2">{Math.floor(item.price * 80 * item.quantity)} ₹ </p>
                   <button onClick={() => deleteCartItem(item.id)} className="text-red-600  hover:text-red-800">
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              ))}
              <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition" onClick={placeOrder}>
                Place Order
              </button>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, ind) => (
                  <button
                    key={ind}
                    className={`px-4 py-1 rounded ${pageNo === ind + 1 ? 'bg-black text-white' : 'bg-gray-300'} hover:bg-gray-400 transition`}
                    onClick={() => setPageNo(ind + 1)}
                  >
                    {ind + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold mb-4">Checkout</h2>
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-medium text-lg">Login</h3>
                <p>{userDetails?.firstName} {userDetails?.lastName}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-medium text-lg">Shipping Address</h3>
                <p>{userDetails?.address}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-medium text-lg">Confirmation Email</h3>
                <p>{userDetails?.email}</p>
              </div>

              <div className="flex space-x-4">
                <button onClick={() => setIsCheckOut(false)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Back</button>
                <button onClick={() => navigate("/Payment")} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Continue</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:w-4/12">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
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
    </>
  );
};

export default Cart;
