import "./sidebar.css";
import { SvgIconProps } from "@mui/material";


interface SidebarItemProps {
  parentGroupId: number;
  itemId: number;
  active: boolean;
  title: string;
  icon: React.ComponentType<SvgIconProps>;
  handleClick: (parentGroupId: number, itemId: number, active: boolean) => void;
}

function SidebarItem({
  parentGroupId,
  itemId,
  active,
  title,
  icon,
  handleClick,
}: SidebarItemProps) {

  const IconComponent = icon;
  return (
    <>
      <div
        className={
          active
            ? "sidebar-item-container sidebar-item-active"
            : "sidebar-item-container"
        }
        onClick={() => handleClick(parentGroupId,itemId,active)}
      >
        <div className="sidebar-item-icon">
          <IconComponent />
        </div>
        <div className="sidebar-item-title">
          <h5>{title}</h5>
        </div>
      </div>
    </>
  );
}

export default SidebarItem;
