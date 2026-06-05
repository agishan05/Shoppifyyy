import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {

      alert("Please Register First");
      return;

    }


    if (
      username.trim() === storedUser.username &&
      password.trim() === storedUser.password
    ) {

      alert("Login Successful");

      // ✅ SAVE AUTH STATE
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(storedUser));

      // 🔥 redirect after login
      const redirect =
        localStorage.getItem("redirectAfterLogin") || "/";

      localStorage.removeItem("redirectAfterLogin");

      // ⚡ IMPORTANT FIX: force UI update
      window.location.href = redirect;

    } else {


      alert("Invalid Username or Password");

    }

  };


  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8">

          Login

        </h1>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-4 rounded-xl mb-5"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-5"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={loginUser}
          className="w-full bg-black text-white py-4 rounded-xl text-xl cursor-pointer"
        >

          Login

        </button>

        {/* Register Link */}

        <p className="text-center mt-5">

          Don't have account?
          <Link to="/register" className="text-blue-500 ml-2">
            Register

          </Link>

        </p>

      </div>

    </div>


  );

}


export default Login;