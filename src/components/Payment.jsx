import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { db } from '../firebase';
import { collection,addDoc,deleteDoc, doc, getDocs} from 'firebase/firestore';
import { useSelector } from 'react-redux';

const Payment = () => {
  const cartItems = useSelector((state) => state?.user?.myCart);
    const uid = useSelector((state) => state?.user?.userid);
  const navigate = useNavigate();
  const [selectedMethod,setSelectedMethod]=useState("");



const deleteCartItems = async () => {
  try {
    const cartRef = collection(db, 'users', uid, 'cart');
    const cartSnapshot = await getDocs(cartRef);

    const deletePromises = cartSnapshot.docs.map((docItem) =>
      deleteDoc(doc(db, 'users', uid, 'cart', docItem.id))
    );

    await Promise.all(deletePromises);
    console.log("Cart cleared successfully");
  } catch (error) {
    console.error("Error clearing cart:", error);
    toast.error("Failed to clear cart.");
  }
};


const handlePayment = async () => {
  if (!selectedMethod) {
    toast.error("Please select a payment method.");
    return;
  }

  try {
    const orderCollectionRef = collection(db, 'users', uid, 'orders');

    const uploadPromises = cartItems.map((item) => {
      return addDoc(orderCollectionRef, {
        ...item,
        paymentMethod: selectedMethod,
        orderDate: new Date(),
      });
    });

    await Promise.all(uploadPromises);
     await deleteCartItems();

    toast.success("Payment successful! Orders placed.");
    
    // Optionally: clear cart from Redux or Firestore here

    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (error) {
    console.error("Error saving orders: ", error);
    toast.error("Failed to place order.");
  }
};


  function handleRadio(e) {
    setSelectedMethod(e.target.getAttribute("payment-type"));
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br px-4">
      <ToastContainer theme="colored"></ToastContainer>
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full animate-fade-in">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Complete Your Payment
        </h3>

        <div className="space-y-4">
          <div className="border p-4 rounded-lg flex items-center space-x-3 hover:shadow-md transition cursor-pointer">
            <input onChange={handleRadio} checked={selectedMethod=="Cash on Delivery"} type="radio" name="payment" payment-type="Cash on Delivery" className="accent-black" />
            <i className="fas fa-money-bill-wave text-xl text-green-600"></i>
            <span className="text-lg font-medium text-gray-700">Cash on Delivery</span>
          </div>

          <div className="border p-4 rounded-lg flex items-center space-x-3 hover:shadow-md transition cursor-pointer">
            <input onChange={handleRadio} checked={selectedMethod=="Credit/Debit Card"} type="radio" name="payment" payment-type="Credit/Debit Card" className="accent-black" />
            <i className="fas fa-credit-card text-xl text-blue-500"></i>
            <span className="text-lg font-medium text-gray-700">Credit/Debit Card</span>
          </div>

          <div className="border p-4 rounded-lg flex items-center space-x-3 hover:shadow-md transition cursor-pointer">
            <input onChange={handleRadio} type="radio" name="payment"  payment-type="UPI / Wallet" className="accent-black" />
            <i className="fas fa-mobile-alt text-xl text-purple-500"></i>
            <span className="text-lg font-medium text-gray-700">UPI / Wallet</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-black text-white py-3 text-lg rounded-lg hover:bg-gray-800 transition shadow-md"
        >
          Pay now
        </button>
      </div>
    </div>
  );
};

export default Payment;
