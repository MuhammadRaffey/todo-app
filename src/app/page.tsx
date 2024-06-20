// pages/index.tsx

import React from "react";
import Todos from "../components/todo-list";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-center text-[30px] sm:p-5">Home</h1>
      <Todos />
    </div>
  );
};

export default Home;
