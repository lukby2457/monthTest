import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SetUser, UserProfile } from '../types/authType';

const Layout = ({ children, user, setUser }: {children: React.ReactNode, user: UserProfile | null; setUser: SetUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <header>
        <nav className='flex items-center justify-between p-5 bg-gray-100 min-h-20'>
          <Link to={"/"} className='text-orange-400'>
            홈
          </Link>
          <div className='flex items-center space-x-4 w-70'>
            {user ? (
              <>
                <Link to={"/profile"} className='text-orange-400'>
                  프로필
                </Link>
                <Link to={"/test"} className='text-orange-400'>
                  테스트
                </Link>
                <Link to={"/results"} className='text-orange-400'>
                  결과보기
                </Link>
                <button onClick={handleLogout} className='p-2 text-white transition bg-orange-400 rounded-md hover:bg-orange-600'>
                  로그아웃
                </button>
              </>
            ) : (
              <Link to={"/login"} className='text-orange-400'>
                로그인
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout