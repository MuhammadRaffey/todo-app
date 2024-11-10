// pages/index.tsx

import React from "react";
import Todos from "../components/todo-list";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-center text-[30px] my-5 sm:my-5">Todos</h1>
      <Todos />
    </div>
  );
};

export default Home;
