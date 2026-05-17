import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Please login before checkout");
      localStorage.setItem("checkoutPending", "true");
      navigate("/login");
    }
  }, [navigate, location]);

  const placeOrder = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please login before placing an order");
      localStorage.setItem("checkoutPending", "true");
      navigate("/login");
      return;
    }

    if (!name || !phone || !address || !paymentMethod) {
      alert("Please fill all fields and select payment method");
      return;
    }

    setShowSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-[450px]">
          <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-4 rounded-xl mb-5"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-4 rounded-xl mb-5"
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Delivery Address"
            className="w-full border p-4 rounded-xl mb-5"
            rows="4"
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <select
            className="w-full border p-4 rounded-xl mb-5"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          <button
            onClick={placeOrder}
            className="w-full bg-yellow-400 py-4 rounded-xl text-xl font-bold cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-[400px]">
            <div className="text-7xl mb-5">✅</div>
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for shopping with us.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
