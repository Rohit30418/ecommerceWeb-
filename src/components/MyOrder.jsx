import React from 'react'
import { db } from '../firebase'
import { collection,doc ,onSnapshot } from 'firebase/firestore'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
const MyOrder = () => {
const [orderItems,setOrderItems]=useState([]);
const uid = useSelector((state) => state?.user?.userid);
  useEffect(() => {
    const fetchCartItems = () => {
      const userDocRef = doc(db, 'users', uid);
      const cartCollectionRef = collection(userDocRef, 'orders');
      
      const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
        const cartItemsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrderItems(cartItemsList);
      });

      return () => unsubscribe();
    };

    if (uid) {
      fetchCartItems();
    }
  }, [uid]);


  console.log(orderItems);
  
  

  return (
    <div>

    
    </div>
  )
}

export default MyOrder