import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <div className="w-full h-14" />
      <Outlet />
    </div>
  );
};