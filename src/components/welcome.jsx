import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <p className="title text-xl"> Dashboard</p>
      <p className="sub-title">
        {" "}
        Welcome <strong>{user && user.username}</strong>
      </p>
    </div>
  );
};

export default Welcome;
