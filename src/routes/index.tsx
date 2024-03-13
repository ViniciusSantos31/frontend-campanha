import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { ConfirmCode } from "@pages/RecoveryPassword/ConfirmCode";
import { NewPassword } from "@pages/RecoveryPassword/NewPassword";
import { RequestCode } from "@pages/RecoveryPassword/RequestCode";
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
      />
      <Route path="/recovery">
        <Route
          path="request"
          element={<RequestCode />}
        />
        <Route
          path="confirm"
          element={<ConfirmCode />}
        />
        <Route
          path="password"
          element={<NewPassword />}
        />
      </Route>
    </Routes>
  );
}

export default function RoutesApp() {
  return <RouterProvider router={router} />;
}
