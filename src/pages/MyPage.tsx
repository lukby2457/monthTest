import React, { useState } from "react";
import { updateProfile } from "../api/auth";
import { SetUser, UserProfile } from "../types/authType";

const MyPage = ({ user, setUser }: { user: UserProfile | null; setUser: SetUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const token = localStorage.getItem("accessToken");

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await updateProfile(
      {
        nickname: nickname,
      },
      token
    );
    if (data.success && user) {
      setUser({ ...user, nickname: data.nickname });
      alert("닉네임 변경에 성공하였습니다.");
    } else alert("update failed");
  };

  return (
    <div className="flex justify-center">
      <div className="p-5 m-5 rounded-lg shadow-lg w-100">
        <h1 className="mb-6 text-3xl font-bold text-center text-primary-color">
          프로필 수정
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>현재 닉네임: {user?.nickname}</label>
            <input
              onChange={handleNicknameChange}
              className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
