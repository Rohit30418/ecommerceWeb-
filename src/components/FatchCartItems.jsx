import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { myCart } from './Redux/UserSlice';
import { db } from '../firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
const FatchCartItems = () => {
    const dispatch= useDispatch();
    const uid = useSelector((state) => state?.user?.userid);
    useEffect(() => {
        const fetchCartItems = () => {
          const userDocRef = doc(db, 'users', uid);
          const cartCollectionRef = collection(userDocRef, 'cart');
          
          const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
            const cartItemsList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            dispatch(myCart(cartItemsList));
          });
    
          return () => unsubscribe();
        };
    
        if (uid) {
          fetchCartItems();
        }
      }, [uid]);
}

export default FatchCartItems