import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, highlightText }) {
  return (
    <article className="group flex h-[520px] flex-col overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)]">
      
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black">
          {product.badge}
        </span>

        <button
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          onClick={() => onToggleWishlist(product)}
          className={`absolute right-4 top-4 rounded-full p-2 transition ${
            isWishlisted
              ? 'bg-yellow-400 text-black'
              : 'bg-white/90 text-gray-700 hover:bg-yellow-400'
          }`}
        >
          ♥
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">

        {/* Category & Rating */}
        <div className="mb-3 flex items-center justify-between gap-3 text-sm text-gray-500">
          <span className="rounded-full bg-gray-100 px-2.5 py-1">
            {product.category}
          </span>

          <span className="font-medium text-amber-600">
            ★ {product.rating}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="min-h-[56px] text-lg font-semibold text-gray-900">
          {highlightText ? highlightText(product.name) : product.name}
        </h3>

        {/* Description */}
        <p
          className="mt-2 text-sm leading-6 text-gray-600 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </p>

            <p className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            {product.availability}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex-1 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-yellow-500 hover:text-black"
          >
            Add to Cart
          </button>

          <Link
            to={`/product/${product.id}`}
            className="flex-1 rounded-full border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-yellow-600"
          >
            Quick View
          </Link>
        </div>

      </div>
    </article>
  );
}

export default ProductCard;