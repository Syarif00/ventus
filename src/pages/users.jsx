import React from "react";
import Layout from "./Layout";
import UserList from "../components/userList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default Users;
