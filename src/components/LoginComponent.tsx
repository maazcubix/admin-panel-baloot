import { FormEvent, useRef, useState } from "react";
import { LoginApi } from "../../api/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [visiblePassword, setvisiblePassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const login = await LoginApi({ email, password });
      console.log(login.data);
      if (login.data.data.role === "Admin") {
        dispatch(setToken(login.data.data));
        navigate("/");
      }
      setError(true);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper full-page">
        <div className="page-content d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-md-8 col-xl-6 mx-auto">
              <div className="card">
                <div className="row">
                  <div className="col-md-12 pl-md-0">
                    <div className="auth-form-wrapper px-4 py-5 ">
                      <a
                        href="#"
                        className="noble-ui-logo d-block mb-2 text-center"
                      >
                        Baloot <span>- Admin Panel</span>
                      </a>
                      {error && (
                        <div className="alert alert-danger text-center">
                          invalid credeentials
                        </div>
                      )}
                      <h5 className="text-muted font-weight-normal mb-4 text-center">
                        Welcome back! Log in to your account.
                      </h5>
                      <form
                        onSubmit={handleLogin}
                        className="forms-sample px-4"
                        method="post"
                      >
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="text-left"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <div className="input-group">
                            <input
                              type={visiblePassword ? "text" : "password"}
                              value={password}
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                              className="form-control"
                              id="exampleInputPassword1"
                              autoComplete="current-password"
                              placeholder="Password"
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => {
                                  setvisiblePassword(!visiblePassword);
                                }}
                              >
                                {!visiblePassword && (
                                  <i className="fa fa-eye"></i>
                                )}
                                {visiblePassword && (
                                  <i className="fa fa-eye-slash"></i>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
