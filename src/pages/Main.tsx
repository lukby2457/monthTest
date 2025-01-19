import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">Main Page</h1>
        <TodosList />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Main;
