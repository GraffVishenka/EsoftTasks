import React, { useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import { shortName } from "../../lib/utils";

const LeftSidebar = () => {
  const { store } = useContext(Context);
  
  const name = shortName(store.user.fullName)

  return (
    <div className="bg-dark-3 ">
      <div className="flex m-4 gap-4 ">
        <BsPersonCircle className="w-10 h-10" />
        <div className=" flex items-center ">{name}</div>
      </div>
      <hr />
      <div className="flex flex-col gap-5 items-center mt-5">
        <NavLink to="/tasks" className="">
          Задачи
        </NavLink>
      </div>
    </div>
  );
};

export default LeftSidebar;
