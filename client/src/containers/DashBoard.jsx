import React from "react";
import { DBLeftSection, DBRightSection } from "../components/index";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center">
      <DBLeftSection></DBLeftSection>
      <DBRightSection></DBRightSection>
    </div>
  );
};

export default Dashboard;
