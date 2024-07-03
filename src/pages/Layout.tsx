import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Toolbar from "@/components/Toolbar";
import Footer from "@/components/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Toolbar />
      <div className="mx-auto max-w-[1024px]">
        <Outlet />
      </div>
      <Toolbar />
      <Footer />
    </>
  );
};