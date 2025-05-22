import "./sidebar.css"

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  colorScheme: string;
}

function SidebarItem({ title, icon, colorScheme }: SidebarItemProps) {
  return (
    <>
      <div className="sidebar-item-container">
        <div className="sidebar-item-icon">{icon}</div>
        <div className="sidebar-item-title"><h5>{title}</h5></div>
      </div>
    </>
  );
}

export default SidebarItem;
