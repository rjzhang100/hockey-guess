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
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: API_URL,
          async fetch(url, options) {
            try {
              const response = await fetch(url, {
                ...options,
                credentials: "include",
              });

              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP Error ${response.status}: ${errorText}`);
              }

              return response;
            } catch (error) {
              console.error("Fetch error in tRPC client:", error);
              throw error;
            }
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
      path: routes.CREATE_ACCOUNT,
      element: <CreateAccount />,
    },
    {
      path: routes.ROOT,
      element: <RequireAuth />,
      children: [
        {
          path: routes.ROOT,
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
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
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
