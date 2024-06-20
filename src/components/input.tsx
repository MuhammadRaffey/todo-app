import React, { ChangeEvent, FormEvent } from "react";

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAdd: (e: FormEvent) => void;
};

const Input: React.FC<InputProps> = ({ value, onChange, onAdd }) => {
  return (
    <div className="flex flex-row mx-5 px-5  md:justify-start justify-center ">
      <input
        type="text"
        placeholder="Add Todo"
        value={value}
        onChange={onChange}
        className="rounded-sm px-4 text-black sm:text-[20px] text-[10px] py-1"
      />
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white rounded-sm px-4 mx-5 text-[20px]"
      >
        Add
      </button>
    </div>
  );
};

export default Input;
