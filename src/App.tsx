import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./pages/partial/Header";
import Sidebar from "./pages/partial/Sidebar";
import { Fragment, useEffect } from "react";
import Footer from "./pages/partial/Footer";
import Dashboard from "./pages/Dashboard";
import UserView from "./pages/user-management/UserView";
import Login from "./pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import BasicDemo from "./pages/product-management/productView";
import View from "./pages/user-management/View";
import DetailView from "./pages/product-management/DetailView";

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.admin);
  const navigate = useNavigate();
  const Logout = () => {};
  useEffect(() => {
    if (!user?.accessToken) {
      navigate("/login", { replace: true });
      console.log("hello  ");
    }
  }, []);

  const history = useLocation();

  useEffect(() => {
    console.log("test");
  }, [history.pathname]);

  return (
    <Fragment>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <Header />
          <Sidebar />
          <div className="page-content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

function App() {
  const user = useSelector((state: any) => state.auth.admin);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Dashboard />} />
        </Route>
        <Route path="/user-listing" element={<UserView />} />
        <Route path="/product-management" element={<BasicDemo />} />
        <Route path="/product-management/create" element={<DetailView />} />

        <Route path="/product-management/:id" element={<DetailView />} />

        <Route
          path="/login"
          element={user?.accessToken ? <Navigate to="/" /> : <Login />}
        />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      {/* <View/> */}
    </>
  );
}

export default App;
