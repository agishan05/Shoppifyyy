import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {

  const [cart, setCart] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const products = [

  {
    id:1,
    name:"Gaming Laptop",
    price:89999,
    image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  },

  {
    id:2,
    name:"Smart Watch",
    price:4999,
    image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },

  {
    id:3,
    name:"Headphones",
    price:2999,
    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },

  {
    id:4,
    name:"Camera",
    price:45999,
    image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
  },

  {
    id:5,
    name:"Sneakers",
    price:3999,
    image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },

  {
    id:6,
    name:"Keyboard",
    price:2499,
    image:"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
  },

  {
    id:7,
    name:"Mobile Phone",
    price:24999,
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },

  {
    id:8,
    name:"Bluetooth Speaker",
    price:1999,
    image:"https://images.unsplash.com/photo-1589003077984-894e133dabab"
  },

  {
    id:9,
    name:"Monitor",
    price:15999,
    image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
  },

  {
    id:10,
    name:"Perfume",
    price:999,
    image:"https://images.unsplash.com/photo-1541643600914-78b084683601"
  },

  {
    id:11,
    name:"Coffee Mug",
    price:499,
    image:"https://images.unsplash.com/photo-1514228742587-6b1558fcf93a"
  },

  {
    id:12,
    name:"Tablet",
    price:18999,
    image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
  },

  {
    id:13,
    name:"Office Chair",
    price:6999,
    image:"https://images.unsplash.com/photo-1505843490701-5be5d2d8d1c1"
  },

  {
    id:14,
    name:"Backpack",
    price:1499,
    image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },

  {
    id:15,
    name:"Gaming Mouse",
    price:1999,
    image:"https://images.unsplash.com/photo-1527814050087-3793815479db"
  },

  {
    id:16,
    name:"Television",
    price:45999,
    image:"https://images.unsplash.com/photo-1593784991095-a205069470b6"
  },

  {
    id:17,
    name:"Drone Camera",
    price:55999,
    image:"https://images.unsplash.com/photo-1473968512647-3e447244af8f"
  },

  {
    id:18,
    name:"Sunglasses",
    price:1299,
    image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083"
  },

  {
    id:19,
    name:"Running Shoes",
    price:3499,
    image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },

  {
    id:20,
    name:"Digital Clock",
    price:899,
    image:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
  },

  {
    id:21,
    name:"Water Bottle",
    price:399,
    image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8"
  },

  {
    id:22,
    name:"PlayStation 5",
    price:55999,
    image:"https://images.unsplash.com/photo-1606813907291-d86efa9b94db"
  },

  {
    id:23,
    name:"AirPods",
    price:14999,
    image:"https://images.unsplash.com/photo-1600294037681-c80b4cb5b434"
  },

  {
    id:24,
    name:"Microphone",
    price:4999,
    image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81"
  },

  {
    id:25,
    name:"Gaming Chair",
    price:12999,
    image:"https://images.unsplash.com/photo-1582582429416-c0f2ff7d7f94"
  }

];

  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {

      const updatedCart = cart.map((item) =>

        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item

      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);

    }

    setShowCartPopup(true);

  };

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item

    );

    setCart(updatedCart);

  };

  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item

    );

    setCart(updatedCart);

  };

  const removeItem = (id) => {

    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (

    <div className="bg-gray-100 min-h-screen">
      

      {/* HERO */}
      <section
        id="home"
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1664201890484-a5f7109c8e56?q=80&w=1200')",
        }}
      >

        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white text-center px-5">

          <h1 className="text-6xl md:text-8xl font-bold mb-6">

            Welcome To

            <span className="text-yellow-400">
              {" "}Shoppifyy
            </span>

          </h1>

          <p className="text-xl md:text-3xl max-w-3xl">

            Modern Ecommerce Website

          </p>

          <a
            href="#products"
            className="mt-10 bg-yellow-400 text-black px-10 py-5 rounded-2xl text-2xl font-bold hover:scale-110 transition duration-300 cursor-pointer"
          >

            Explore Products

          </a>

        </div>

      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-5 py-20"
      >

        <h1 className="text-5xl font-bold text-center mb-16">
          Trending Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >

              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">

                <h1 className="text-2xl font-bold">
                  {product.name}
                </h1>

                <p className="text-green-600 text-2xl font-bold mt-3">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-5 bg-black text-white py-3 rounded-xl hover:bg-gray-800 hover:scale-105 transition duration-300 cursor-pointer"
                >

                  Add To Cart

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CART */}
      <section
        id="cart"
        className="max-w-6xl mx-auto px-5 pb-20"
      >

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <h1 className="text-4xl font-bold mb-10">

            🛒 Shopping Cart

          </h1>

          {cart.length === 0 ? (

            <div className="text-center py-10">

              <h1 className="text-3xl text-gray-500">

                Cart Is Empty

              </h1>

            </div>

          ) : (

            <div>

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between items-center border-b py-8 gap-5"
                >

                  <div className="flex items-center gap-5">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />

                    <div>

                      <h1 className="text-2xl font-bold">
                        {item.name}
                      </h1>

                      <p className="text-green-600 text-xl mt-2">
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col items-center gap-4">

                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="bg-gray-300 px-4 py-2 rounded-xl text-2xl cursor-pointer"
                      >
                        -
                      </button>

                      <span className="text-2xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="bg-gray-300 px-4 py-2 rounded-xl text-2xl cursor-pointer"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="bg-red-500 text-white px-5 py-3 rounded-xl cursor-pointer"
                    >

                      Remove

                    </button>

                  </div>

                </div>

              ))}

              <div className="mt-10 flex justify-between items-center flex-wrap gap-5">

                <h1 className="text-4xl font-bold">

                  Total: ₹{totalPrice}

                </h1>

                <button onClick={() => window.location.href = "/checkout"}

                  className="bg-yellow-400 px-10 py-4 rounded-2xl text-2xl font-bold hover:scale-110 transition duration-300 cursor-pointer"
                >

                  Checkout

                </button>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="bg-black text-white py-10 px-5"
      >

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-3xl font-bold mb-5 text-yellow-400">

            About Shoppifyy

          </h1>

          <p className="text-lg text-gray-300 leading-8">

            Shoppifyy is a modern ecommerce website
            inspired by Amazon with responsive design,
            shopping cart and beautiful UI.

          </p>

        </div>

      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-8 px-5 bg-gray-100"
      >

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-center mb-6">

            Contact Us

          </h1>

          <input
            type="text"
            placeholder="Your Name"
            className="border w-full p-4 rounded-xl mb-4"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="border w-full p-4 rounded-xl mb-4"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            className="border w-full p-4 rounded-xl"
          ></textarea>

          <button className="mt-5 w-full bg-black text-white py-4 rounded-xl text-xl cursor-pointer">

            Send Message

          </button>

        </div>

      </section>

      {/* CART POPUP */}
      {
        showCartPopup && (

          <div className="fixed bottom-5 right-5 bg-white shadow-2xl rounded-2xl p-5 z-50 w-[320px]">

            <h1 className="text-2xl font-bold text-green-600">

              ✅ Item Added To Cart

            </h1>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() =>
                  setShowCartPopup(false)
                }
                className="flex-1 bg-gray-300 py-3 rounded-xl cursor-pointer"
              >

                Continue

              </button>

              <a
                href="#cart"
                onClick={() =>
                  setShowCartPopup(false)
                }
                className="flex-1 bg-yellow-400 py-3 rounded-xl text-center font-bold cursor-pointer"
              >

                Go To Cart

              </a>

            </div>

          </div>

        )
      }
      

      {/* SUCCESS MESSAGE */}
      {
        showSuccess && (

          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-[400px]">

              <div className="text-7xl mb-5">

                ✅

              </div>

              <h1 className="text-4xl font-bold text-green-600 mb-4">

                Order Placed Successfully!

              </h1>

              <p className="text-xl text-gray-600">

                Thank you for shopping with us.

              </p>

            </div>

          </div>

        )
      }

    </div>
  );
}

export default Home;