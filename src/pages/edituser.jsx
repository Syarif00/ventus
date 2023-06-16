import React from "react";
import Layout from "./Layout";
import FormEditUser from "../components/formEditUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";
import { useEffect } from "react";

const EditUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUsers;
