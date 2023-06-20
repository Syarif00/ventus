import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `https://ventus.up.railway.app/api/users/${id}`
        );
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://ventus.up.railway.app/api/users/${id}`, {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      navigate("/dashboard/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <h1> Edit User</h1>
      <div className="">
        <Form className="mt-3" onSubmit={updateUser}>
          <p className="text-danger text-center"> {msg} </p>
          <Form.Group className="mb-4 was-validated">
            <Form.Label>Username</Form.Label>
            <Form.Group className="was-validated ">
              <Form.Control
                type="text"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2"
              />
            </Form.Group>

            <Form.Label>Email</Form.Label>
            <Form.Group className="was-validated" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
              />
            </Form.Group>

            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter your Password"
              required
              value={password}
              className="mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label>Confirm Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter your Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button variant="dark" type="submit" className="button btn  mt-3">
              Update
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default FormEditUser;
