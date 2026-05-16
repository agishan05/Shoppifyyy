import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        setProducts(res.data);
      });
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">

      <nav className="bg-black text-white p-4 flex justify-between">
        <h1 className="text-3xl font-bold text-yellow-400">
          AJI SHOP
        </h1>

        <div className="flex gap-5">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
          >

            <img
              src={`http://127.0.0.1:8000${product.image}`}
              className="h-60 w-full object-cover"
            />

            <div className="p-4">

              <h1 className="text-xl font-bold">
                {product.name}
              </h1>

              <p className="text-gray-500 mt-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-4">

                <h2 className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </h2>

                <button className="bg-yellow-400 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500">
                  Add Cart
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;