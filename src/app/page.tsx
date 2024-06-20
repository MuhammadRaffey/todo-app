import React from "react";
import Input from "../components/input";
import Todos from "../components/todo-list";

const Home = () => {
  return (
    <div className="flex flex-col ">
      <h1 className="font-bold text-center text-[30px]">Home</h1>
      <Input />
      <Todos />
    </div>
  );
};

export default Home;
