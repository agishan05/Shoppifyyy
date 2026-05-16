// REGISTER PAGE

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registerUser = () => {

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {

      alert("Please Fill All Fields");
      return;

    }

    const userData = {

      username: username.trim(),
      email: email.trim(),
      password: password.trim(),

    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    console.log("Saved User:", userData);

    alert("Registration Successful");

    navigate("/login");

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8">

          Register

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
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl mb-5"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
          onClick={registerUser}
          className="w-full bg-yellow-400 py-4 rounded-xl text-xl font-bold cursor-pointer"
        >

          Register

        </button>

        <p className="text-center mt-5">

          Already have account?

          <Link
            to="/login"
            className="text-blue-500 ml-2"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );
}