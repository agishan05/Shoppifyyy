import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ProductCard from '../components/ProductCard';

function Home({ products, cart, wishlist, loading, addToCart, updateQuantity, removeFromCart, clearCart, toggleWishlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (searchTerm.trim()) {
      const query = searchTerm.trim().toLowerCase();
      items = items.filter((product) => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
    }

    if (selectedCategory !== 'All') {
      items = items.filter((product) => product.category === selectedCategory);
    }

    items = items.filter((product) => product.price <= maxPrice);
    items = items.filter((product) => product.rating >= minRating);

    if (availabilityOnly) {
      items = items.filter((product) => product.availability === 'In stock');
    }

    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        items.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return items;
  }, [products, searchTerm, selectedCategory, maxPrice, minRating, availabilityOnly, sortBy]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const tax = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + deliveryFee + tax;

  const highlightText = (text) => {
    if (!searchTerm.trim()) return text;
    const parts = text.split(new RegExp(`(${searchTerm.trim()})`, 'ig'));
    return parts.map((part, index) => (
      <span key={`${part}-${index}`} className={part.toLowerCase() === searchTerm.trim().toLowerCase() ? 'rounded bg-yellow-200 px-1' : ''}>
        {part}
      </span>
    ));
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.18),_transparent_35%),linear-gradient(135deg,#111827_0%,#1f2937_100%)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl text-white">
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">Curated essentials for modern living</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Elevate everyday shopping with <span className="text-yellow-400">Shoppifyy</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl">
              Discover top-rated products, fast delivery, and a shopping experience built to feel effortless on every screen.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#products" className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">Explore products</a>
              <a href="#cart" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400">View cart</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 6).map((product, index) => (
                  <div key={product.id} className={`group relative overflow-hidden rounded-[1.2rem] ${index === 0 ? 'col-span-2' : ''}`}>
                    <div className="h-36 overflow-hidden rounded-[1.2rem]">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-yellow-300">{product.category}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{product.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-[1rem] border border-white/10 bg-white/10 px-4 py-3 text-sm text-gray-200">
                <p className="font-semibold text-white">Curated premium picks</p>
                <p className="mt-1 text-gray-300">Every featured item is styled with the same polished, uniform presentation.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl justify-center text-sm text-gray-300">
          <a href="#products" className="flex flex-col items-center gap-2 transition hover:text-yellow-400">
            <span>Scroll for deals</span>
            <span className="text-xl">↓</span>
          </a>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-600">Trending picks</p>
            <h2 className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">Shop your next favorite item</h2>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">{filteredProducts.length} products available</div>
        </div>

        <div className="rounded-[2rem] border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span>Search</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                className="rounded-full border border-gray-200 px-4 py-3 text-sm focus:border-yellow-400"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span>Category</span>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="rounded-full border border-gray-200 px-4 py-3 text-sm focus:border-yellow-400">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span>Max price</span>
              <input type="range" min="1000" max="100000" step="1000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="accent-yellow-500" />
              <span className="text-xs text-gray-500">Up to ₹{maxPrice.toLocaleString()}</span>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-full border border-gray-200 px-4 py-3 text-sm focus:border-yellow-400">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <label className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2">
              <input type="checkbox" checked={availabilityOnly} onChange={() => setAvailabilityOnly((value) => !value)} className="accent-yellow-500" />
              Available now
            </label>
            <label className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2">
              <span>Minimum rating</span>
              <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))} className="bg-transparent text-sm outline-none">
                <option value={0}>Any</option>
                <option value={4}>4+</option>
                <option value={4.5}>4.5+</option>
              </select>
            </label>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filteredProducts.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-gray-300 bg-white p-10 text-center">
            <h3 className="text-2xl font-semibold text-gray-900">No products match your search</h3>
            <p className="mt-3 text-gray-600">Try a broader keyword or reset the filters.</p>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                highlightText={highlightText}
              />
            ))}
          </div>
        )}
      </section>

      <section id="cart" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-600">Your basket</p>
              <h2 className="mt-2 text-3xl font-semibold text-gray-900">Shopping cart</h2>
            </div>
            {cart.length > 0 && (
              <button type="button" onClick={clearCart} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:text-red-600">
                Clear cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="mt-8 rounded-[1.5rem] border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
              <div className="text-5xl">🛍️</div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900">Your cart is empty</h3>
              <p className="mt-3 text-gray-600">Add a few favorites and they will appear here instantly.</p>
              <Link to="#products" className="mt-6 inline-flex rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black">Continue shopping</Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        <p className="mt-2 text-base font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-1">
                        <button type="button" onClick={() => updateQuantity(item.id, -1)} className="h-9 w-9 rounded-full text-lg">−</button>
                        <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)} className="h-9 w-9 rounded-full text-lg">+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] bg-gray-50 p-6">
                <h3 className="text-xl font-semibold text-gray-900">Order summary</h3>
                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>₹{tax.toLocaleString()}</span></div>
                  <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold text-gray-900"><span>Grand total</span><span>₹{grandTotal.toLocaleString()}</span></div>
                </div>
                <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-500">Proceed to checkout</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">About Shoppifyy</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">A refined shopping experience with purpose</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            We blend thoughtful product curation with seamless browsing and smooth delivery details to create a storefront that feels premium on every device.
          </p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm lg:grid-cols-[0.75fr_1.25fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-600">Contact</p>
            <h2 className="mt-2 text-3xl font-semibold text-gray-900">Let’s make your next order effortless</h2>
            <p className="mt-4 text-gray-600">Our team is available to answer questions about delivery, returns, or anything else you need.</p>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input placeholder="Your name" className="rounded-full border border-gray-200 px-4 py-3" />
              <input placeholder="Email address" className="rounded-full border border-gray-200 px-4 py-3" />
            </div>
            <textarea rows="4" placeholder="Tell us what you need" className="rounded-[1.5rem] border border-gray-200 px-4 py-3" />
            <button type="button" className="w-fit rounded-full bg-black px-5 py-3 font-semibold text-white transition hover:bg-yellow-500 hover:text-black">Send message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;