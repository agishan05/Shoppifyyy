import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (!storedUser) {
      window.alert('Please register first.');
      return;
    }

    if (username.trim() === storedUser.username && password.trim() === storedUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(storedUser));
      const redirect = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirect);
    } else {
      window.alert('Invalid username or password.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
      <div className="w-full max-w-md rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-600">Login</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to continue your secure checkout journey.</p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm text-gray-700">
            <span className="mb-2 block">Username</span>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" className="w-full rounded-full border border-gray-200 px-4 py-3" />
          </label>
          <label className="block text-sm text-gray-700">
            <span className="mb-2 block">Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="w-full rounded-full border border-gray-200 px-4 py-3" />
          </label>
        </div>

        <button type="button" onClick={loginUser} className="mt-6 w-full rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-500">Login</button>

        <p className="mt-5 text-center text-sm text-gray-600">
          No account yet?
          <Link to="/register" className="ml-2 font-semibold text-yellow-600">Create one</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;