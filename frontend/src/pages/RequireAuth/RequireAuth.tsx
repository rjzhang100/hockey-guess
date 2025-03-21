import { Navigate, Outlet } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import { routes } from "../../constants/routes";

const RequireAuth = () => {
  const { data, isLoading, isError } = trpc.auth.checkLoggedIn.useQuery(
    undefined,
    { refetchOnMount: "always", retry: false }
  );

  if (isError || (!isLoading && !data?.loggedIn)) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return <Outlet />;
};

export default RequireAuth;
