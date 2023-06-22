import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ventus.up.railway.app/api/users", {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil Membuat Akun",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Gagal membuat akun",
          text: error.response.data.message,
        });
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="text-xl-left">
          <h1>Logo</h1>
        </Col>
      </Row>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xl={4} lg={6} md={8} className="mt-5">
            <div className="border border-secondary rounded p-3">
              <div className="">
                <h3 className="font-weight-light text-center"> Welcome !</h3>
                <h2 className="mt-4">Register </h2>
                <p>Don't have any account?</p>
                <Form className="mt-3" onSubmit={saveUser}>
                  <p className="text-danger text-center"> {msg} </p>

                  <Form.Group className="mb-4 was-validated">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Group className="mb-2 was-validated">
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        required
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Label htmlFor="email">Email address</Form.Label>
                    <Form.Group className="mb-2 was-validated">
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      className="mb-2"
                      id="password"
                      type="password"
                      placeholder="Enter your Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <Form.Label htmlFor="confirmPassword">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      id="confirmPassword"
                      placeholder="Enter your Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                      variant="dark"
                      type="submit"
                      className="button btn w-100 mt-3"
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Form>

                <p className="font-weight-bold text-center">
                  Already have an Account ?{" "}
                  <Link
                    to="/"
                    role="button"
                    className="text-decoration-none text-dark fw-bold cursor"
                  >
                    {" "}
                    Login
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

export default Register;
