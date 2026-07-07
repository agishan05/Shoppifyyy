import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    state: '',
    city: '',
    zip: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      localStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/login');
    }
  }, [navigate]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + deliveryFee + tax;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.zip) {
      window.alert('Please complete the required delivery details.');
      return;
    }

    setIsSubmitting(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user?.username;
    const order = {
      id: `ORD-${Date.now()}`,
      ...form,
      paymentMethod,
      total: grandTotal,
      date: new Date().toLocaleString(),
      items: cart,
    };

    const existingOrders = JSON.parse(localStorage.getItem(`orders_${username}`) || '[]');
    localStorage.setItem(`orders_${username}`, JSON.stringify([order, ...existingOrders]));

    setOrderNumber(order.id);
    setShowSuccess(true);
    setIsSubmitting(false);
    clearCart();
  };

  if (!cart.length) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-gray-900">Your cart is empty</h1>
          <p className="mt-3 text-gray-600">Add a few items before placing your order.</p>
          <button type="button" onClick={() => navigate('/')} className="mt-6 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black">Continue shopping</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={placeOrder} className="space-y-6 rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-600">Checkout</p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">Complete your order</h1>
          </div>

          <section className="rounded-[1.5rem] border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">Customer information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-gray-700">
                <span className="mb-2 block">Full name</span>
                <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-full border border-gray-200 px-4 py-3" required />
              </label>
              <label className="text-sm text-gray-700">
                <span className="mb-2 block">Email</span>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-full border border-gray-200 px-4 py-3" required />
              </label>
              <label className="text-sm text-gray-700 sm:col-span-2">
                <span className="mb-2 block">Phone</span>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-full border border-gray-200 px-4 py-3" required />
              </label>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-gray-700">
                <span className="mb-2 block">Country</span>
                <input name="country" value={form.country} onChange={handleChange} className="w-full rounded-full border border-gray-200 px-4 py-3" />
              </label>
              <label className="text-sm text-gray-700">
                <span className="mb-2 block">State</span>
                <input name="state" value={form.state} onChange={handleChange} className="w-full rounded-full border border-gray-200 px-4 py-3" required />
              </label>
              <label className="text-sm text-gray-700">
                <span className="mb-2 block">City</span>
                <input name="city" value={form.city} onChange={handleChange} className="w-full rounded-full border border-gray-200 px-4 py-3" required />
              </label>
              <label className="text-sm text-gray-700">
                <span className="mb-2 block">ZIP code</span>
                <input name="zip" value={form.zip} onChange={handleChange} className="w-full rounded-full border border-gray-200 px-4 py-3" required />
              </label>
              <label className="text-sm text-gray-700 sm:col-span-2">
                <span className="mb-2 block">Full address</span>
                <textarea name="address" rows="4" value={form.address} onChange={handleChange} className="w-full rounded-[1.25rem] border border-gray-200 px-4 py-3" required />
              </label>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">Payment method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {['card', 'upi', 'cod'].map((method) => (
                <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${paymentMethod === method ? 'border-yellow-400 bg-yellow-50 text-yellow-700' : 'border-gray-200 text-gray-700'}`}>
                  {method === 'card' ? 'Credit card' : method === 'upi' ? 'UPI' : 'Cash on delivery'}
                </button>
              ))}
            </div>
          </section>

          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </button>
        </form>

        <aside className="rounded-[2rem] bg-gray-900 p-6 text-white shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm text-gray-300">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-sm text-gray-300">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{tax.toLocaleString()}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-white"><span>Grand total</span><span>₹{grandTotal.toLocaleString()}</span></div>
          </div>
        </aside>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
            <h2 className="mt-4 text-3xl font-semibold text-gray-900">Order placed successfully</h2>
            <p className="mt-3 text-gray-600">Your order number is <span className="font-semibold text-gray-900">{orderNumber}</span>.</p>
            <button type="button" onClick={() => navigate('/')} className="mt-6 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black">Continue shopping</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Checkout;