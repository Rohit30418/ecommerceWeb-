import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserData } from "../../Redux/UserSlice";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const UserAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ Only take serializable data
        const serializableUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
          emailVerified: user.emailVerified,
        };

        dispatch(addUserData(serializableUser)); // ✅ Safe dispatch
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default UserAuth;
