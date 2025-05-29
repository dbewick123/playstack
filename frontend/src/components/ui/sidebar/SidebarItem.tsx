import "./sidebar.css";

import { useState } from "react";

interface SidebarItemProps {
  parentGroupId: number;
  itemId: number;
  title: string;
  icon: React.ReactNode;
  handleClick: (parentGroupId: number, itemId: number, active: boolean) => void;
}

function SidebarItem({
  parentGroupId,
  itemId,
  title,
  icon,
  handleClick,
}: SidebarItemProps) {
  // TODO: integrate with the redux store
  const [filterActive, setFilterActive] = useState(false);

  // TODO: add null checks here and disable/remove filter object if null (I contron the IDs so seems a little overkill, but is best practice)
  const handleClickWrapper = () => {
    setFilterActive((currentStatus) => {
      handleClick(parentGroupId, itemId, !currentStatus);
      return !currentStatus;
    });
  };

  return (
    <>
      <div
        className={
          filterActive
            ? "sidebar-item-container sidebar-item-active"
            : "sidebar-item-container"
        }
        onClick={() => handleClickWrapper()}
      >
        <div className="sidebar-item-icon">{icon}</div>
        <div className="sidebar-item-title">
          <h5>{title}</h5>
        </div>
      </div>
    </>
  );
}

export default SidebarItem;
