import { db } from "../../services/firebase";
import { doc, collection, addDoc } from "firebase/firestore"; // ✅ FIX: Import these

export const uploadGuestCartToFirestore = async (userId) => {
  const existingCartItem = JSON.parse(localStorage.getItem("cartItem"));

  if (!existingCartItem || !Array.isArray(existingCartItem)) return;

  try {
    // ✅ Correctly create references
    const userDocRef = doc(db, "users", userId);
    const cartCollectionRef = collection(userDocRef, "cart");

    // ✅ Upload all guest items
    await Promise.all(
      existingCartItem.map((item) => addDoc(cartCollectionRef, item))
    );

    // ✅ Clean up local storage
    localStorage.removeItem("cartItem");
    localStorage.removeItem("guest");

    console.log("Guest cart successfully uploaded to Firestore!");
  } catch (error) {
    console.error("Error migrating guest cart:", error);
  }
};
