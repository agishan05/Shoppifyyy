// LOGIN PAGE

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginUser = () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      alert("Please Register First");
      return;

    }

    const user = JSON.parse(storedUser);

    console.log("Stored User:", user);

    if (

      username.trim() === user.username &&
      password.trim() === user.password

    ) {

      alert("Login Successful");

      navigate("/");

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

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-4 rounded-xl mb-5"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-5"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={loginUser}
          className="w-full bg-black text-white py-4 rounded-xl text-xl cursor-pointer"
        >

          Login

        </button>

        <p className="text-center mt-5">

          Don't have account?

          <Link
            to="/register"
            className="text-blue-500 ml-2"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );
}