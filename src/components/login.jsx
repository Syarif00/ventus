import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import Swal from "sweetalert2";
import { logo } from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
  }, [user, isSuccess, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Login",
      });
    }
  }, [isError, isSuccess, message]);

  useEffect(() => {
    dispatch(reset());
  }, [user, isSuccess, dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col className="text-center">
          <img src={logo} alt="logo" />
        </Col>
      </Row>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xl={4} lg={6} md={8} className="mt-5">
            <div className="border border-secondary rounded p-3">
              <div className="">
                <h3 className="font-weight-light text-center"> Welcome !</h3>
                <h2 className="mt-4">Sign in </h2>
                <Form className="mt-3" onSubmit={Auth}>
                  <Form.Group className="mb-4 was-validated">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      placeholder="********"
                      required
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                      variant="dark"
                      type="submit"
                      className="button btn mt-3 w-100"
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </Button>
                  </Form.Group>
                </Form>

                <p className="font-weight-bold text-center">
                  Don't have an Account ?{" "}
                  <Link
                    to="/register"
                    role="button"
                    className="text-decoration-none text-dark fw-bold"
                  >
                    {" "}
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
