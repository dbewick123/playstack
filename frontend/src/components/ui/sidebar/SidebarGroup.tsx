import "./sidebar.css";

//Components
import SidebarItem from "./SidebarItem";

//Redux
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addGenre,
  removeGenre,
  addPlatform,
  removePlatform,
  selectFilters
} from "../../../store/slices/searchSlice";

import { SvgIconProps } from "@mui/material";


interface SidebarGroupProps {
  groupName: string;
  groupId: number;
  items: { id: number; name: string; icon: React.ComponentType<SvgIconProps> }[];
}
// TODO: Test that the clicks update redux properly
function SidebarGroup({ groupId, groupName, items }: SidebarGroupProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentReduxFilters = useSelector(selectFilters);

  const handleClick = (
    parentGroupId: number,
    itemId: number,
    active: boolean
  ) => {
    if (parentGroupId === 1 && active === true) {
      dispatch(removeGenre(itemId.toString()));
    } else if (parentGroupId === 1 && active === false) {
      dispatch(addGenre(itemId.toString()));
    } else if (parentGroupId === 2 && active === true) {
      dispatch(removePlatform(itemId.toString()));
    } else if (parentGroupId === 2 && active === false) {
      dispatch(addPlatform(itemId.toString()));
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
              active={groupId === 1 ? currentReduxFilters.genres.includes(item.id.toString()) : currentReduxFilters.platforms.includes(item.id.toString())}
              title={item.name}
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
