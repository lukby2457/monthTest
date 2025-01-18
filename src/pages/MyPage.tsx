import React from "react";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    navigate("/login");
  };

  return (
    <div>
      <h1>My Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MyPage;