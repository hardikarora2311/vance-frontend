import React from "react";
import RateDashboard from "./RateDashboard";

const AppMain = ({ user }) => {
  return (
    <div className="min-h-screen bg-[#111] text-white py-20">
      <RateDashboard user={user} />
    </div>
  );
};

export default AppMain;
