import { useCallback, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"; // Assuming you're using React Router v6+
import { trpc } from "../../utils/trpc"; // Assuming this is where your trpc is imported
import { routes } from "../../constants/routes";

const RequireAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { data, isLoading, isError } = trpc.auth.checkLoggedIn.useQuery(
    undefined,
    {}
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  if (!data?.loggedIn) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RequireAuth;
