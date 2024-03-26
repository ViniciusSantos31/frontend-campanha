import { Conference } from "@pages/Conference";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { NotFound } from "@pages/NotFound";
import { RecoveryPassword } from "@pages/RecoveryPassword";
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
        path="/recovery"
        element={<RecoveryPassword />}
      >
        <Route
          path="request"
          element={<RequestCode />}
        />
        <Route
          path="password/:codeId"
          element={<NewPassword />}
        />
        <Route
          path="confirm/:codeId"
          element={<ConfirmCode />}
        />
      </Route>
      <Route
        path="/conference/:short"
        element={<Conference />}
      />
      <Route
        path="/404"
        element={<NotFound />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default function RoutesApp() {
  return <RouterProvider router={router} />;
}
