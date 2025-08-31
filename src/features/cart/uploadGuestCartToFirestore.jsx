export const uploadGuestCartToFirestore = async (userId) => {
  const existingCartItem = JSON.parse(localStorage.getItem("cartItem"));
  if (!existingCartItem || !Array.isArray(existingCartItem)) return;

  try {
    const userDocRef = doc(db, 'users', userId);
    const cartCollectionRef = collection(userDocRef, 'cart');
    await Promise.all(
      existingCartItem.map(item => addDoc(cartCollectionRef, item))
    );
    localStorage.removeItem("cartItem");
    localStorage.removeItem("guest");
  } catch (error) {
    console.error("Error migrating guest cart:", error);
  }
};
