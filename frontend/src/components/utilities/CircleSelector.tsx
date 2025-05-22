import React from "react";
import "./circleSelector.css";
interface SelectableCircleProps {
  selected: boolean;
  onClick: () => void;
}

const SelectableCircle: React.FC<SelectableCircleProps> = ({
  selected,
  onClick,
}) => {
  return (
    <div className="circle-wrapper" onClick={onClick}>
      <div className={`circle ${selected ? "circle-selected" : ""}`} />
    </div>
  );
};

export default SelectableCircle;
