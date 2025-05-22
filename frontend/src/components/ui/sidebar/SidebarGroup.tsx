import SidebarItem from "./SidebarItem";
import "./sidebar.css";

interface SidebarGroupProps {
  groupName: string;
  item: { itemName: string; icon: React.ReactNode }[];
  colorScheme: string;
}

function SidebarGroup({
  groupName,
  item,
  colorScheme,
}: SidebarGroupProps) {
  console.log("my group", groupName);
  return (
    <>
      <div className="sidebar-group-container">
        <div className="sidebar-group-heading-container">
          <div className="sidebar-group-name"><h6>{groupName}</h6></div>
        </div>
        <div className="sidebar-group-item-container">
          {item.map((item, index) => (
            <SidebarItem
              key={index}
              title={item.itemName}
              icon={item.icon}
              colorScheme={colorScheme}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SidebarGroup;
