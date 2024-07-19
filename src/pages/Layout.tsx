import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Toolbar from "@/components/Toolbar";

export default function Layout() {
  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          const paths = ["/"];
          return paths.includes(location.pathname)
            ? // Root restore by pathname
            location.pathname
            : // everything else by location like the browser
            location.key;
        }}
      />
      <Header />
      <Toolbar />
      <div className="mx-auto max-w-[1024px]">
        <Outlet />
      </div>
    </>
  );
};