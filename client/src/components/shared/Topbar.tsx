import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Context } from "../..";

const Topbar = () => {
  const {store} = useContext(Context)

  const onClick = () =>{
    store.signOut()
  }
    return (
    <div className="flex justify-between p-4 bg-dark-4 ">
      <div className="flex items-center text-xl">
        <img
          className="w-10"
          alt="img"
          src={require("../../assets/icons/icons8-работник-67.png")}
        />
        <div className="ml-5">CherryTasks</div>
      </div>
      <Button className="shad-button_primary" onClick={onClick}>Выход</Button>
    </div>
  );
};

export default Topbar;
