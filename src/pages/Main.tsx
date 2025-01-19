import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const queryClient = new QueryClient();

const fetchTodos = async (): Promise<
  { id: number; title: string; completed: boolean }[]
> => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data.slice(0, 10);;
};

const TodosList = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 5000
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!todos || todos.length === 0) return <p>No data available</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <p className="text-black">
            {todo.title}-{" "}
            {todo.completed ? "Completed" : "Incomplete"}
          </p>
        </li>
      ))}
    </ul>
  );
};

const Main: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">Main Page</h1>
        <nav className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="font-medium text-blue-500 hover:text-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="font-medium text-blue-500 hover:text-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/mypage"
                className="font-medium text-green-500 hover:text-green-700"
              >
                My Page
              </Link>
              <button
                onClick={handleLogout}
                className="font-medium text-red-500 hover:text-red-700 focus:outline-none"
              >
                Logout
              </button>
            </>
          )}
        </nav>
        <TodosList />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Main;
