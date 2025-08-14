import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { myOrder } from './Redux/UserSlice';
import { db } from '../firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';

const FatchOrderItems = () => {
const dispatch = useDispatch();
const uid = useSelector((state) => state?.user?.userData?.uid);
   useEffect(() => {
          if (!uid) return;
  
          const userDocRef = doc(db, 'users', uid);
          const cartCollectionRef = collection(userDocRef, 'orders');
  
          const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
              const cartItemsList = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              }));
              dispatch(myOrder(cartItemsList));
          }, (error) => {
              console.error("Error fetching cart items:", error);
          });
  
          return () => unsubscribe();
      }, [uid, dispatch]);
  
      return null; // Since this is a background data-fetching component
}

export default FatchOrderItems