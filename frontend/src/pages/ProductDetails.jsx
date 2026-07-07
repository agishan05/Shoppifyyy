import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

function ProductDetails({ cart, wishlist, addToCart, toggleWishlist, updateQuantity, removeFromCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => products.find((item) => item.id === Number(id)), [id]);
  const relatedProducts = useMemo(() => products.filter((item) => item.id !== Number(id)).slice(0, 4), [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Product not found</h1>
          <button onClick={() => navigate('/')} className="mt-5 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black">Back to Shop</button>
        </div>
      </div>
    );
  }

  const currentQuantity = cart.find((item) => item.id === product.id)?.quantity || 0;
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="rounded-[2rem] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-gray-50">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="h-[360px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[460px]"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.images?.map((image, index) => (
                  <button key={image} type="button" aria-label={`View preview ${index + 1}`} onClick={() => setSelectedImage(index)} className={`overflow-hidden rounded-2xl border ${selectedImage === index ? 'border-yellow-400' : 'border-gray-200'}`}>
                    <img src={image} alt={`${product.name} preview ${index + 1}`} className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="mb-3 w-fit rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">{product.badge}</span>
              <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">{product.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="rounded-full bg-gray-100 px-3 py-1">★ {product.rating}</span>
                <span>{product.reviews} reviews</span>
                <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-green-700">{product.availability}</span>
              </div>
              <p className="mt-5 text-lg font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
              <p className="mt-1 text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</p>

              <p className="mt-6 text-base leading-7 text-gray-600">{product.description}</p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-1">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-10 w-10 rounded-full text-xl">−</button>
                  <span className="min-w-10 text-center font-semibold">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => value + 1)} className="h-10 w-10 rounded-full text-xl">+</button>
                </div>
                <button type="button" onClick={() => addToCart(product, quantity)} className="flex-1 rounded-full bg-black px-5 py-3 font-semibold text-white transition hover:bg-yellow-500 hover:text-black">Add to Cart</button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={() => { addToCart(product, quantity); navigate('/checkout'); }} className="rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.01]">Buy Now</button>
                <button type="button" onClick={() => toggleWishlist(product)} className={`rounded-full border px-5 py-3 font-semibold transition ${isWishlisted ? 'border-yellow-400 bg-yellow-50 text-yellow-600' : 'border-gray-200 text-gray-700 hover:border-yellow-400'}`}>
                  {isWishlisted ? '♥ Saved' : '♡ Wishlist'}
                </button>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
                <p className="font-semibold text-gray-900">Why customers love it</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Premium build and modern finish</li>
                  <li>Fast shipping and secure checkout</li>
                  <li>Flexible returns within 7 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="rounded-[2rem] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Related Products</h2>
            <Link to="/" className="text-sm font-semibold text-yellow-600">View all</Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some((wish) => wish.id === item.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
