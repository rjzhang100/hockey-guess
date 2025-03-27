import { Navigate, Outlet } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import { routes } from "../../constants/routes";

const RequireAuth = () => {
  const { data, isLoading, isError } = trpc.auth.checkLoggedIn.useQuery(
    undefined,
    { refetchOnMount: "always", retry: false }
  );
  console.log("REQUIRE AUTH");

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log(data, isError);

  if (isError || (!isLoading && !data?.loggedIn)) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
