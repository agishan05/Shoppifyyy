import { useMemo } from 'react';

function OrderHistory() {
  const orders = useMemo(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const username = user?.username;
      if (!username) return [];
      const userOrders = JSON.parse(localStorage.getItem(`orders_${username}`) || '[]');
      return Array.isArray(userOrders) ? userOrders : [];
    } catch {
      return [];
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-600">Orders</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-900">Your order history</h1>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
            <p className="text-lg text-gray-600">No orders found yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <article key={order.id} className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-600">{order.id}</p>
                    <h2 className="mt-1 text-xl font-semibold text-gray-900">{order.name}</h2>
                  </div>
                  <div className="rounded-full bg-gray-100 px-3 py-2 text-sm text-gray-600">{order.date}</div>
                </div>
                <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                  <p><span className="font-semibold text-gray-900">Phone:</span> {order.phone}</p>
                  <p><span className="font-semibold text-gray-900">Payment:</span> {order.paymentMethod}</p>
                  <p><span className="font-semibold text-gray-900">Address:</span> {order.address}</p>
                  <p><span className="font-semibold text-gray-900">Total:</span> ₹{order.total?.toLocaleString()}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default OrderHistory;