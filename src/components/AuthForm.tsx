import React, { useState } from "react";

const AuthForm = ({
  mode,
  onSubmit,
}: {
  mode: string;
  onSubmit: (formData: {
    id: string;
    password: string;
    nickname: string;
  }) => Promise<void>;
}) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    keyName: string
  ) => {
    const value = e.target.value;
    const newFormData = { ...formData, [keyName]: value };
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={(e) => handleChange(e, "id")}
        placeholder="아이디"
        required
        className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e, "password")}
        placeholder="비밀번호"
        required
        className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={(e) => handleChange(e, "nickname")}
          placeholder="닉네임"
          required
          className="w-full p-4 mb-5 border border-gray-300 rounded-lg"
        />
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
      >
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
