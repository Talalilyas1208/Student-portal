import React from "react";
import { SPRoleSelector } from "./Components";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "./redux/slices/authSlice";

export default function Lecturer() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const handleChange = (val) => {
    dispatch(setRole(val));
  };

  return <SPRoleSelector role={role} onChange={handleChange} />;
}
