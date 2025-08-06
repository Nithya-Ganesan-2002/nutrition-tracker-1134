import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

// PUBLIC_INTERFACE
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Nutrition Tracker</h2>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/log" className="sidebar-link">
          Log Food
        </NavLink>
        <NavLink to="/history" className="sidebar-link">
          History
        </NavLink>
        <NavLink to="/analytics" className="sidebar-link">
          Analytics
        </NavLink>
        <NavLink to="/logout" className="sidebar-link">
          Logout
        </NavLink>
      </nav>
    </aside>
  );
}
