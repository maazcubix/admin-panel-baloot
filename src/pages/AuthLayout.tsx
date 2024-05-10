import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import Footer from "./partial/Footer";

const AuthLayout = (props: any) => {
  const user = useSelector((state: any) => state.auth.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.accessToken) navigate("/login");
  }, []);

  return (
    <Fragment>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <Header />
          <Sidebar />

          <div className="page-content">{props.children}</div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default AuthLayout;
