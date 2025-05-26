import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUserId } from './Redux/UserSlice';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const UserAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(addUserId(user));
            } else {
                console.log("User is not logged in.");
            }
        });

        // Clean up subscription on component unmount
        return () => unsubscribe();
    }, [dispatch]);

    return null; // or any other component or content you might want to render
};

export default UserAuth;
