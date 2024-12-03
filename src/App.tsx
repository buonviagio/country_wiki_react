import "./App.css";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MenuAppBar from "./components/MenuAppBar";
import CountryPage from "./pages/CountryPage";
import { MyContextProvider } from "./context/MyContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRouteForProfilePage from "./components/ProtectedRouteForProfilePage";

const Root = () => {
  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route
        path="countries/:country"
        element={
          <ProtectedRoute>
            <CountryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRouteForProfilePage>
            <ProfilePage />
          </ProtectedRouteForProfilePage>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthContextProvider>
        <MyContextProvider>
          <RouterProvider router={router} />
        </MyContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
