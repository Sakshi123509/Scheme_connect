import React from "react";

const search = () => {
  return (
    <div>
      {" "}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="
  pl-10 pr-4 py-1.5 rounded-full text-sm 
  bg-white/95 text-gray-800 placeholder-gray-500
  shadow-md shadow-black/20
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-amber-400
  focus:shadow-lg"
        />
        <search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
};

export default search;
