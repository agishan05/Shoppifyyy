import { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;

    if (!username) {
      setOrders([]);
      return;
    }

    const userOrders =
      JSON.parse(localStorage.getItem(`orders_${username}`)) || [];

    setOrders(userOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">
          No orders found
        </p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold mb-3">
                Order ID: {order.id}
              </h2>

              <p><b>Name:</b> {order.name}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Payment:</b> {order.paymentMethod}</p>
              <p><b>Date:</b> {order.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;