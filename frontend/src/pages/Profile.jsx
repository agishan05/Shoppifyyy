import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!isLoggedIn || !user.username) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center w-[400px]">
          <h1 className="text-3xl font-bold mb-5">You are not logged in</h1>

          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px] text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-yellow-400 flex justify-center items-center text-3xl font-bold mb-5">
          {user.username.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-4xl font-bold mb-5">My Profile</h1>

        <div className="text-lg mb-3">
          <b>Username:</b> {user.username}
        </div>

        <div className="text-green-600 font-bold mb-6">
          Logged In ✅
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="w-full bg-blue-500 text-white py-3 rounded-xl mb-3"
        >
          My Orders
        </button>

        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-3 rounded-xl"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;