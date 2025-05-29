import "./sidebar.css";

//Components
import SidebarItem from "./SidebarItem";

//Redux
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import {
  addGenre,
  removeGenre,
  addPlatform,
  removePlatform
} from "../../../store/slices/searchSlice";

interface SidebarGroupProps {
  groupName: string;
  groupId: number;
  items: { id: number; itemName: string; icon: React.ReactNode }[];
}
// TODO: Test that the clicks update redux properly
function SidebarGroup({ groupId, groupName, items }: SidebarGroupProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (
    parentGroupId: number,
    itemId: number,
    active: boolean
  ) => {
    if (parentGroupId === 1 && active === true) {
      dispatch(addGenre(itemId.toString()));
    } else if (parentGroupId === 1 && active === false) {
      dispatch(removeGenre(itemId.toString()));
    } else if (parentGroupId === 2 && active === true) {
      dispatch(addPlatform(itemId.toString()));
    } else if (parentGroupId === 2 && active === false) {
      dispatch(removePlatform(itemId.toString()));
    }
  };

  return (
    <>
      <div className="sidebar-group-container">
        <div className="sidebar-group-heading-container">
          <div className="sidebar-group-name">
            <h6>{groupName}</h6>
          </div>
        </div>
        <div className="sidebar-group-item-container">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              parentGroupId={groupId}
              itemId={item.id}
              title={item.itemName}
              icon={item.icon}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SidebarGroup;
