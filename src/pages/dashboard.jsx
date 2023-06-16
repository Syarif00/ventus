import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetMe } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, errorMessage } = useSelector((state) => state.auth);

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
      {isError ? (
        <div className="text-center">
          <h3>Failed to load user data:</h3>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <Welcome />
      )}
    </Layout>
  );
};

export default Dashboard;
