import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./constants/routes";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { API_URL } from "./constants/env";
import RequireAuth from "./pages/RequireAuth/RequireAuth";
import { Bounce, ToastContainer } from "react-toastify";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: API_URL,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );
  const router = createBrowserRouter([
    {
      path: routes.LOGIN,
      element: <Login />,
    },
    {
      path: routes.ROOT,
      element: <RequireAuth />,
      children: [
        {
          path: routes.HOME,
          element: <Home />,
        },
        {
          path: "/asd",
          element: <>HI</>,
        },
      ],
    },
  ]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-left"
          autoClose={1200}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          theme="dark"
          transition={Bounce}
        />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
