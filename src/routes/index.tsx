import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { SignUp } from "@pages/SignUp";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    Component: Root,
  },
]);

function Root() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      <Route
        caseSensitive
        path="home"
        element={<Home />}
      />
      <Route
        caseSensitive
        path="signup"
        element={<SignUp />}
      />
      <Route
        path="*"
        element={<Login />}
        hydrateFallbackElement={<Login />}
      />
    </Routes>
  );
}

export default function RoutesApp() {
  return <RouterProvider router={router} />;
}
