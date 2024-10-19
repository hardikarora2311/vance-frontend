import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="top-0 w-full z-50 px-8 py-6 bg-[#111111] border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="/">
          <img src="./logo.svg" alt="logo-vance" />
        </a>
        <button className="bg-[#81EBAB] text-black px-6 py-4 rounded-full font-medium flex items-center gap-2">
          <Link to="/dashboard">Download app</Link>
          <img src="./download.svg" alt="download" className="size-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
