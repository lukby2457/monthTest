import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from "./pages/MyPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserProfile } from './api/auth';
import { UserProfile } from './types/authType';

function App() {
  const [isToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const getUser = async() => {
      const userData = await getUserProfile(isToken);
      if(userData.success) setUser(userData);
      else alert("User save failed");
    }

    // eslint-disable-next-line no-extra-boolean-cast
    if(!!isToken) {
      getUser();
    }
  }, []);

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route 
            path="/login" 
            element={<Login user={user} setUser={setUser} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUp user={user} />} 
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute user={user}>
                <MyPage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App