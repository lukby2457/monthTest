import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰 유무 확인
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Main Page</h1>
      <nav className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/mypage"
              className="text-green-500 hover:text-green-700 font-medium"
            >
              My Page
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium focus:outline-none"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Main;