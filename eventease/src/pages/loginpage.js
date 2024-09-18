import React, { useState } from "react";
import { X } from "lucide-react";
import { signup,login } from "../api/user/auth";

const PopupAuth = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const response = await login(formData);
        setMessage('login successful!');
        // TODO: Store the token in localStorage or a state management solution
        const user= response.data.user;
        const token = response.data.token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        // TODO: Redirect the user or update the UI as needed
        setIsOpen(false);
        window.location.href = "/";
      } else {
        const response = await signup(formData);
        setMessage('Signup successful!');
        // TODO: Store the token in localStorage or a state management solution
        const user= response.data.user;
        const token = response.data.token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        // TODO: Redirect the user or update the UI as needed
        setIsOpen(false);
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    }
  };

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleCross = () => {
    setIsOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="bg-cover bg-center max-h-screen flex items-center justify-center">
      {isOpen && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-70 flex items-center justify-center p-4 z-10">
          <div className="bg-[#000000] rounded-2xl shadow-xl max-w-lg w-full p-6 md:p-10 relative">
            <button onClick={handleCross} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {isLogin ? "Sign in to EventEase" : "Create an EventEase Account"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Username"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {!isLogin && (
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="user">User</option>
                  <option value="organizer">Organizer</option>
                </select>
              )}
              <button 
                type="submit"
                className="w-full py-2 px-4 bg-white rounded-full text-black font-bold hover:bg-gray-200 transition duration-300"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
            {isLogin && (
              <button className="w-full mt-4 py-2 px-4 text-gray-400 hover:text-white transition duration-300">
                Forgot password?
              </button>
            )}
            <p className="mt-6 text-center text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={toggleAuthMode} className="ml-2 text-blue-400 hover:underline">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupAuth;