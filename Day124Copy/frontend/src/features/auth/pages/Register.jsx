import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {handleRegister}=useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ username, email, password });
    await handleRegister({username,email,password})
    // after successful register → login page
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f10] text-[#e4e4e7]">
      
      <div className="w-full max-w-md bg-[#18181b] border border-[#27272a] rounded-2xl p-8 shadow-lg">
        
        {/* Heading */}
        <h2 className="text-2xl font-medium text-center mb-6">
          Create Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username */}
          <div>
            <label className="block text-sm text-[#a1a1aa] mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-3 bg-[#0f0f10] border border-[#27272a] rounded-lg focus:border-indigo-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-[#a1a1aa] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 bg-[#0f0f10] border border-[#27272a] rounded-lg focus:border-indigo-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-[#a1a1aa] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-[#0f0f10] border border-[#27272a] rounded-lg focus:border-indigo-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition py-3 rounded-lg font-medium"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Navigation */}
        <p className="text-sm text-[#a1a1aa] text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}