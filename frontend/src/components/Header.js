import React from "react";
import { PageHeader } from "antd";
import "./Header.css";

const Header = () => {
  return (
    <PageHeader className="site-page-header" onBack={() => null} title="Task" />
  );
};

export default Header;
