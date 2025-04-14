import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { writeBatch,collection,setDoc, doc,onSnapshot, } from 'firebase/firestore';

import { useSelector } from 'react-redux';
const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const uid = useSelector((state) => state?.user?.userid);
    const [cartItems, setCartItems] = useState([]);

    const API_URL = 'https://www.fakepay.io/purchase';
    const API_KEY = 'cfc65ad1671a865ba28c4911126ce9'; // Replace with your actual API key
    const navigate=useNavigate();
    const validate = () => {
        const errors = {};

        if (!cardNumber || !/^[0-9]{16}$/.test(cardNumber)) {
            errors.cardNumber = 'Card number must be 16 digits';
        }

        if (!expiryMonth || !/^(0[1-9]|1[0-2])$/.test(expiryMonth)) {
            errors.expiryMonth = 'Invalid expiry month';
        }

        if (!expiryYear || !/^[0-9]{4}$/.test(expiryYear)) {
            errors.expiryYear = 'Invalid expiry year';
        }

        if (!cvv || !/^[0-9]{3,4}$/.test(cvv)) {
            errors.cvv = 'CVC must be 3 or 4 digits';
        }

        if (!amount || amount <= 0) {
            errors.amount = 'Amount must be a positive number';
        }

        if (!zipCode || !/^[0-9]{5}$/.test(zipCode)) {
            errors.zipCode = 'Invalid zip code';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        if (validate()) {
            setLoading(true);

            const paymentDetails = {
                card_number: cardNumber,
                cvv: cvv,
                expiration_month: expiryMonth,
                expiration_year: expiryYear,
                zip_code: zipCode,
                amount: amount,
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token token=${API_KEY}`,
                    },
                    body: JSON.stringify(paymentDetails),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error_code || 'Payment failed');
                }

                const data = await response.json();
                setMessage(`Payment successful! Token: ${data.token}`);
            } catch (error) {
                setMessage(`Payment failed: ${error.message}`);
            } finally {
                setLoading(false);
            }
        } else {
            setMessage('Please correct the errors in the form.');
        

            const fetchCartItems = () => {
                const userDocRef = doc(db, 'users', uid);
                const cartCollectionRef = collection(userDocRef, 'cart');
                
                const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
                  const cartItemsList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  }));

                  setCartItems(cartItemsList); // Update state with fetched cart items

                });
          
                return () => unsubscribe();
              };

              const placeOrder = async () => {
                try {
                    // const db = getFirestore();
                    const userDocRef = doc(db, 'users', uid);
                    const ordersCollectionRef = collection(userDocRef, 'orders');
            
                    // Create a new order with the cart items
                    const orderDocRef = doc(ordersCollectionRef); // Firestore auto-generates a unique ID
                    await setDoc(orderDocRef, {
                        uid: uid,
                        items: cartItems,
                        createdAt: new Date(),
                        status: 'Pending', // Example field
                    });
            
                    console.log('Order placed successfully:', orderDocRef.id);
            
                    // Clear the user's cart after placing the order
                    const batch = writeBatch(db);
                    cartItems.forEach((item) => {
                        const cartItemDocRef = doc(userDocRef, 'cart', item.id);
                        console.log('Deleting cart item:', cartItemDocRef.path);
                        batch.delete(cartItemDocRef);
                    });
            
                    await batch.commit();
                    console.log('Cart cleared successfully!');
                    navigate("/Thanks");
                } catch (error) {
                    console.error('Error placing order:', error);
                }
            };
            
            

              placeOrder();
          
              if (uid) {
                fetchCartItems();
              }
        } 
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Card Number</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
                {errors.cardNumber && <div style={{ color: 'red' }}>{errors.cardNumber}</div>}
            </div>

            <div>
                <label>Expiry Month (MM)</label>
                <input
                    type="text"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                />
                {errors.expiryMonth && <div style={{ color: 'red' }}>{errors.expiryMonth}</div>}
            </div>

            <div>
                <label>Expiry Year (YYYY)</label>
                <input
                    type="text"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                />
                {errors.expiryYear && <div style={{ color: 'red' }}>{errors.expiryYear}</div>}
            </div>

            <div>
                <label>CVC</label>
                <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
                {errors.cvv && <div style={{ color: 'red' }}>{errors.cvv}</div>}
            </div>

            <div>
                <label>Amount (in cents)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <div style={{ color: 'red' }}>{errors.amount}</div>}
            </div>

            <div>
                <label>Zip Code</label>
                <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
                {errors.zipCode && <div style={{ color: 'red' }}>{errors.zipCode}</div>}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>

            {message && <p>{message}</p>}
        </form>
    );
};

export default Payment;
