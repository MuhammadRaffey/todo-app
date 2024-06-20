import React from "react";

const Input = () => {
  return (
    <div className="flex flex-row mx-5">
      <input type="text" placeholder="Add Todo" className="rounded-sm" />
      <button className="bg-blue-600 rounded-sm px-4 mx-2">Add</button>
    </div>
  );
};

export default Input;
