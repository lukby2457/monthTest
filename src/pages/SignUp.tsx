import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserProfile } from "../types/authType";

const Signup = ({ user }: {user: UserProfile | null}) => {
  const navigate = useNavigate();

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!user) navigate("/profile");

  const handleSignup = async (formData: {
    id: string;
    password: string;
    nickname: string;
  }) => {
    try {
      const data = await register(formData);

      if (data.success) navigate("/login");
      else alert("Signup Failed");
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-5 m-5 rounded-lg shadow-lg w-100">
        <h1 className="mb-6 text-3xl font-bold text-center text-primary-color">
          회원가입
        </h1>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div>
          <p>
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-orange-400 hover:text-inherit hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
