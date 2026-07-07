import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!isLoggedIn || !user.username) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-gray-900">You are not logged in</h1>
          <p className="mt-3 text-gray-600">Sign in to manage your profile and view orders.</p>
          <button type="button" onClick={() => navigate('/login')} className="mt-6 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black">Go to login</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-3xl font-semibold text-black">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-gray-900">My profile</h1>
          <p className="mt-2 text-gray-600">Manage account information and keep your basket ready.</p>
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div className="rounded-2xl bg-gray-50 p-4"><span className="font-semibold">Username:</span> {user.username}</div>
            <div className="rounded-2xl bg-gray-50 p-4"><span className="font-semibold">Email:</span> {user.email}</div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Account actions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button type="button" onClick={() => navigate('/orders')} className="rounded-[1.25rem] bg-gray-900 px-5 py-4 font-semibold text-white transition hover:bg-yellow-500 hover:text-black">View orders</button>
            <button type="button" onClick={logout} className="rounded-[1.25rem] border border-red-200 px-5 py-4 font-semibold text-red-600 transition hover:bg-red-50">Logout</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;