import { useState, useEffect } from "react";
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import FetchCartItems from "./FetchCartItems";
import InnerBanner from "../../common/InnerBanner";

const Cart = () => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [copyCartItems, setCopyCartItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const uid = useSelector((state) => state?.user?.userData?.uid);
  const isloggedin = useSelector((state) => state?.user?.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Load cart: Firestore for logged-in, localStorage for guest
  useEffect(() => {
    if (isloggedin && uid) {
      const cartRef = collection(db, "users", uid, "cart");
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCopyCartItems(items);
      });
      return () => unsubscribe();
    } else {
      const guestCart = JSON.parse(localStorage.getItem("cartItem")) || [];
      const cartWithTempId = guestCart.map((item) => ({
        ...item,
        tempid: item.tempid || uuidv4(),
      }));
      setCopyCartItems(cartWithTempId);
      localStorage.setItem("cartItem", JSON.stringify(cartWithTempId));
    }
  }, [isloggedin, uid]);

  const localStorageDataUpdate = (items) => {
    localStorage.setItem("cartItem", JSON.stringify(items));
  };

  const placeOrder = async () => {
    if (!uid) {
      localStorage.setItem("guest", JSON.stringify(true));
      navigate("/login");
      return;
    }
    const userRef = doc(db, "users", uid);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      }
      setIsCheckOut(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const totalPrice = copyCartItems.reduce(
    (acc, item) => acc + Math.floor(item.price * 80 * item.quantity),
    0
  );

  const deleteCartItem = async (cartItemId) => {
    try {
      if (!isloggedin) {
        const updatedCart = copyCartItems.filter(
          (item) => item.tempid !== cartItemId
        );
        setCopyCartItems(updatedCart);
        localStorageDataUpdate(updatedCart);
      } else {
        const cartItemDocRef = doc(db, "users", uid, "cart", cartItemId);
        await deleteDoc(cartItemDocRef);
      }
      toast.success("Item deleted");
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 5) return;

    try {
      if (!isloggedin) {
        const updatedCart = copyCartItems.map((item) =>
          item.tempid === cartItemId || item.id === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCopyCartItems(updatedCart);
        localStorageDataUpdate(updatedCart);
      } else {
        const cartItemDocRef = doc(db, "users", uid, "cart", cartItemId);
        await updateDoc(cartItemDocRef, { quantity: newQuantity });
      }
    } catch (error) {
      console.error("Error updating cart item quantity: ", error);
    }
  };

  if (copyCartItems.length === 0) {
    return (
      <div className="py-16 text-center dark:text-white">
        <h1>
          <span className="text-8xl">&#9785;</span>
        </h1>
        <h1 className="text-2xl font-bold mb-6">Your cart is empty</h1>
        <Link
          className="bg-brandOrange rounded-lg text-white px-6 py-3 hover:bg-orange-600 transition"
          to="/"
        >
          Explore Now
        </Link>
      </div>
    );
  }

  const TotalPages = Math.ceil(copyCartItems.length / 3);

  return (
    <div>
      <InnerBanner title="My Cart" />
      <FetchCartItems />

      <div className="flex flex-col my-10 md:flex-row justify-between px-4 md:px-8 gap-6">
        {/* Left Column - Cart Items */}
        <div className="md:w-7/12 space-y-6">
          {!isCheckOut ? (
            <div className="bg-white dark:bg-gray-800/70 dark:text-white shadow-md rounded-xl p-6">
              <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <i className="fa fa-shopping-cart text-brandOrange"></i> Cart (
                {copyCartItems.length})
              </h1>

              {copyCartItems
                .slice((pageNo - 1) * 3, pageNo * 3)
                .map((item) => (
                  <div
                    key={item.id || item.tempid}
                    className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 border rounded-xl hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4 flex-1 w-full">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">
                          {Math.floor(item.price * 80)} ₹ / each
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <button
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
                        onClick={() =>
                          updateCartItemQuantity(
                            item.id || item.tempid,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
                        onClick={() =>
                          updateCartItemQuantity(
                            item.id || item.tempid,
                            item.quantity + 1
                          )
                        }
                        disabled={item.quantity >= 5}
                      >
                        +
                      </button>
                    </div>

                    {/* Price + Delete */}
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <p className="font-bold text-lg text-brandOrange">
                        {Math.floor(item.price * 80 * item.quantity)} ₹
                      </p>
                      <button
                        onClick={() => deleteCartItem(item.tempid || item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

              {/* Place Order */}
              <button
                className="mt-6 w-full bg-brandOrange text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                onClick={placeOrder}
              >
                Place Order <i className="fas fa-paper-plane ml-2"></i>
              </button>

              {/* Pagination */}
              {copyCartItems.length > 3 && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  {Array.from({ length: TotalPages }).map((_, ind) => (
                    <button
                      key={ind}
                      onClick={() => setPageNo(ind + 1)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm transition ${
                        pageNo === ind + 1
                          ? "bg-brandOrange text-white border-brandOrange"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {ind + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800/70 dark:text-white shadow-md rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <i className="fas fa-cash-register text-brandOrange"></i>{" "}
                Checkout
              </h2>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <i className="fa fa-user"></i> Name
                </h3>
                <p>
                  {userDetails?.firstName} {userDetails?.lastName}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i> Shipping Address
                </h3>
                <p>{userDetails?.address}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <i className="fas fa-envelope"></i> Confirmation Email
                </h3>
                <p>{userDetails?.email}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsCheckOut(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    navigate("/Payment");
                    localStorage.setItem("totalPrice", totalPrice);
                  }}
                  className="flex-1 px-4 py-2 bg-brandOrange text-white rounded-lg hover:bg-orange-600"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:w-4/12">
          <div className="sticky top-24 bg-white dark:bg-gray-800/70 dark:text-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-receipt text-brandOrange"></i> Order Summary
            </h2>
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
    </div>
  );
};

export default Cart;
