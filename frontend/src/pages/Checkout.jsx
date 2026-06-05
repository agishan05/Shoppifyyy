import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔥 Protect checkout page
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please login before checkout");

      // store redirect path
      localStorage.setItem("redirectAfterLogin", "/checkout");

      navigate("/login");
    }
  }, [navigate]);

  const placeOrder = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please login before placing an order");

      localStorage.setItem("redirectAfterLogin", "/checkout");

      navigate("/login");
      return;
    }

    if (!name || !phone || !address || !paymentMethod) {
      alert("Please fill all fields and select payment method");
      return;
    }

    // ✅ CREATE ORDER
    const order = {
      id: Date.now(),
      name,
      phone,
      address,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    // 👇 GET CURRENT USER
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;

    if (!username) {
      alert("User not found. Please login again.");
      navigate("/login");
      return;
    }

    // 👇 GET EXISTING ORDERS
    const existingOrders =
      JSON.parse(localStorage.getItem(`orders_${username}`)) || [];

    // 👇 ADD NEW ORDER
    existingOrders.push(order);

    // 👇 SAVE BACK TO LOCALSTORAGE
    localStorage.setItem(
      `orders_${username}`,
      JSON.stringify(existingOrders)
    );

    // ✅ SHOW SUCCESS UI
    setShowSuccess(true);

    // OPTIONAL: clear form
    setName("");
    setPhone("");
    setAddress("");
    setPaymentMethod("");

    // 🔥 redirect after success
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-[450px]">

          <h1 className="text-4xl font-bold text-center mb-8">
            Checkout
          </h1>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-4 rounded-xl mb-5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-4 rounded-xl mb-5"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Address */}
          <textarea
            placeholder="Delivery Address"
            className="w-full border p-4 rounded-xl mb-5"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Payment */}
          <select
            className="w-full border p-4 rounded-xl mb-5"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          {/* Button */}
          <button
            onClick={placeOrder}
            className="w-full bg-yellow-400 py-4 rounded-xl text-xl font-bold cursor-pointer"
          >
            Place Order
          </button>

        </div>
      </div>

      {/* SUCCESS POPUP */}
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