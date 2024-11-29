import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
type ProtectedRouteForProfilePageProps = {
  children: React.ReactNode;
};
export default function ProtectedRouteForProfilePage({
  children,
}: ProtectedRouteForProfilePageProps) {
  const { user, loader } = useContext(AuthContext);

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
