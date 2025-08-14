import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const Payment = () => {
  const cartItems = useSelector((state) => state?.user?.myCart || []);
  const uid = useSelector((state) => state?.user?.userData?.uid);
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");

  // Modal & payment state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null); // "success" or "failure"

  // Card form state
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const deleteCartItems = async () => {
    try {
      const cartRef = collection(db, "users", uid, "cart");
      const cartSnapshot = await getDocs(cartRef);

      const deletePromises = cartSnapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "users", uid, "cart", docItem.id))
      );

      await Promise.all(deletePromises);
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart.");
    }
  };

  const saveOrders = async (paymentStatus) => {
    const orderCollectionRef = collection(db, "users", uid, "orders");

    const uploadPromises = cartItems.map((item) =>
      addDoc(orderCollectionRef, {
        ...item,
        paymentMethod: selectedMethod,
        orderDate: new Date(),
        paymentStatus,
      })
    );

    await Promise.all(uploadPromises);
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (selectedMethod === "Cash on Delivery") {
      // Place order immediately
      try {
        await saveOrders("Pending");
        await deleteCartItems();
        toast.success("Order placed with Cash on Delivery.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order.");
      }
    } else {
      // Open fake payment modal for Card and UPI
      setIsModalOpen(true);
      setPaymentResult(null);
    }
  };

  const handleRadio = (e) => {
    setSelectedMethod(e.target.getAttribute("payment-type"));
    // Reset payment modal and card data when payment method changes
    setPaymentResult(null);
    setIsProcessing(false);
    setCardData({
      cardNumber: "",
      expiry: "",
      cvv: "",
      name: "",
    });
  };

  const handleCardInput = (e) => {
    setCardData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Simulate payment in modal
  const simulatePayment = () => {
    // Basic validation for card fields if Credit/Debit selected
    if (selectedMethod === "Credit/Debit Card") {
      const { cardNumber, expiry, cvv, name } = cardData;
      if (
        cardNumber.length !== 16 ||
        !/^\d+$/.test(cardNumber) ||
        !/^\d{2}\/\d{2}$/.test(expiry) ||
        cvv.length !== 3 ||
        !/^\d{3}$/.test(cvv) ||
        name.trim() === ""
      ) {
        toast.error("Please fill valid card details.");
        return;
      }
    }

    // For UPI / Wallet, you can add input validation if you add fields (currently just simulates)

    setIsProcessing(true);
    setTimeout(() => {
      const success = Math.random() < 0.8; // 80% success chance
      setPaymentResult(success ? "success" : "failure");
      setIsProcessing(false);

      if (success) {
        toast.success("Payment successful!");
        saveOrders("Paid")
          .then(() => deleteCartItems())
          .then(() => setTimeout(() => navigate("/"), 2000));
      } else {
        toast.error("Payment failed. Please try again.");
      }
    }, 2500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full animate-fade-in">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Complete Your Payment
        </h3>

        <div className="space-y-4">
          <div
            className="border p-4 rounded-lg flex items-center space-x-3 hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedMethod("Cash on Delivery")}
          >
            <input
              onChange={handleRadio}
              checked={selectedMethod === "Cash on Delivery"}
              type="radio"
              name="payment"
              payment-type="Cash on Delivery"
              className="accent-black"
            />
            <i className="fas fa-money-bill-wave text-xl text-green-600"></i>
            <span className="text-lg font-medium text-gray-700">
              Cash on Delivery
            </span>
          </div>

          <div
            className="border p-4 rounded-lg flex items-center space-x-3 hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedMethod("Credit/Debit Card")}
          >
            <input
              onChange={handleRadio}
              checked={selectedMethod === "Credit/Debit Card"}
              type="radio"
              name="payment"
              payment-type="Credit/Debit Card"
              className="accent-black"
            />
            <i className="fas fa-credit-card text-xl text-blue-500"></i>
            <span className="text-lg font-medium text-gray-700">
              Credit/Debit Card
            </span>
          </div>

          <div
            className="border p-4 rounded-lg flex items-center space-x-3 hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedMethod("UPI / Wallet")}
          >
            <input
              onChange={handleRadio}
              checked={selectedMethod === "UPI / Wallet"}
              type="radio"
              name="payment"
              payment-type="UPI / Wallet"
              className="accent-black"
            />
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

      {/* Fake Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full relative shadow-xl">
            <button
              onClick={() => {
                if (!isProcessing) {
                  setIsModalOpen(false);
                  setPaymentResult(null);
                }
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            {!paymentResult && (
              <>
                <h3 className="text-xl font-semibold mb-4">Fake Payment Gateway</h3>
                <p className="mb-4">
                  You selected <strong>{selectedMethod}</strong>.{" "}
                  {selectedMethod === "Credit/Debit Card"
                    ? "Fill your card details below and click pay."
                    : "Click below to simulate payment."}
                </p>

                {selectedMethod === "Credit/Debit Card" && (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      simulatePayment();
                    }}
                  >
                    <input
                      name="cardNumber"
                      type="text"
                      maxLength={16}
                      placeholder="Card Number"
                      value={cardData.cardNumber}
                      onChange={handleCardInput}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <div className="flex space-x-4">
                      <input
                        name="expiry"
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={handleCardInput}
                        className="flex-1 p-2 border rounded"
                        required
                      />
                      <input
                        name="cvv"
                        type="password"
                        maxLength={3}
                        placeholder="CVV"
                        value={cardData.cvv}
                        onChange={handleCardInput}
                        className="flex-1 p-2 border rounded"
                        required
                      />
                    </div>
                    <input
                      name="name"
                      type="text"
                      placeholder="Name on Card"
                      value={cardData.name}
                      onChange={handleCardInput}
                      className="w-full p-2 border rounded"
                      required
                    />

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {isProcessing ? "Processing..." : "Pay ₹999"}
                    </button>
                  </form>
                )}

                {selectedMethod !== "Credit/Debit Card" && (
                  <button
                    onClick={simulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : "Pay ₹999"}
                  </button>
                )}
              </>
            )}

            {paymentResult === "success" && (
              <div className="text-green-600 font-semibold text-center py-6">
                Payment Successful! 🎉
              </div>
            )}

            {paymentResult === "failure" && (
              <div className="text-red-600 font-semibold text-center py-6">
                Payment Failed. Please try again.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
