import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
const SignUp = React.lazy(() => import("./pages/SignUp"));
const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Details = React.lazy(() => import("./pages/Details"));
const Login = React.lazy(() => import("./pages/Login"));
// const postParamHandler = ({ params }) => {
//   if (isNaN(params.id)) {
//     throw new Response("Bad Request", {
//       statusText: "please make sure to insert correct post ID",
//       status: 400,
//     });
//   }
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add",
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <div className="text-lg font-semibold animate-pulse">
                  loading please wait...
                </div>
              </div>
            }
          >
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "SignUp",
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <div className="text-lg font-semibold animate-pulse">
                  loading please wait...
                </div>
              </div>
            }
          >
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <div className="text-lg font-semibold animate-pulse">
                  loading please wait...
                </div>
              </div>
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "post/:id",
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <div className="text-lg font-semibold animate-pulse">
                  loading please wait...
                </div>
              </div>
            }
          >
            <Details />
          </Suspense>
        ),
        // loader: postParamHandler,
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <div className="text-lg font-semibold animate-pulse">
                  loading please wait...
                </div>
              </div>
            }
          >
            <EditPost />
          </Suspense>
        ),
        // loader: postParamHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
