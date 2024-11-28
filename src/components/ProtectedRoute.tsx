import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  console.log("location from protected route:>> ", location);
  // console.log("children :>> ", children);
  const { user, loader } = useContext(AuthContext);

  console.log("loader :>> ", loader);

  const isUserLoggedIn = user?.email ? true : false;

  if (loader) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {isUserLoggedIn ? (
          children
        ) : (
          <Navigate to={"/login"} state={{ prevPath: location.pathname }} />
        )}
      </>
    );
  }
}

export default ProtectedRoute;
