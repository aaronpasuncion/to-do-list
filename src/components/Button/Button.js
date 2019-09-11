import React, { Component } from "react";
import "./Button.css";

const Button = ({ onClick, className = "", children }) => (
  <span onClick={onClick} className={className}>
    {children}
  </span>
);

export default Button;
