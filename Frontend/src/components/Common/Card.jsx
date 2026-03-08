import React from "react";
import { ArrowRight } from "lucide-react";

const CardButton = ({
    number = "1500+",
    description = "Total Schemes",
    bgColor = "bg-amber-100",
    textColor = "text-black",
    onClick = () => {},
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 ${bgColor} rounded-xl cursor-pointer hover:shadow-lg transition-shadow duration-300 w-48 flex flex-col justify-between`}
    >
      <span className={`text-3xl font-bold ${textColor}`}>{number}</span>
      <div className="flex items-center gap-2 mt-2 text-sm font-medium">
        <span className={textColor}>{description}</span>
        <ArrowRight size={16} className={textColor} />
      </div>
    </div>
  );
};

export default CardButton;
