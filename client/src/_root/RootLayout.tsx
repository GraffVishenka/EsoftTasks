import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import Topbar from "../components/shared/Topbar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex flex-col">
      <Topbar />
      <div className="flex-row h-full">
        <LeftSidebar />

        <section className="flex flex-1 h-full justify-center mt-20">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default RootLayout;
