import { Navigate } from "react-router-dom";
import { UserProfile } from "../types/authType";

export const ProtectedRoute = ({
  user,
  children,
}: {
  user: UserProfile | null;
  children: React.ReactNode;
}) => {
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
