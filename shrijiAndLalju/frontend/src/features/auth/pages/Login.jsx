import { useState } from "react";
import { Link,useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user=useSelector(state=>state.auth.user)
  const loading=useSelector(state=>state.auth.loading)
  const navigate=useNavigate()
  const {handleLogin}=useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload={
      email,
      password
    }
    await handleLogin(payload)
    navigate("/")
  };
  if(!loading && user)
  {
    return <Navigate to={"/"}/>
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm space-y-5"
      >
        <h2 className="text-xl font-bold text-center text-white">
          Login Form
        </h2>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-sm text-gray-400 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-500 hover:underline transition"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}