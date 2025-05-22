// Smart container for filter sidebar
import "./sidebar.css";

import SidebarGroup from "./SidebarGroup";
import FilterIcon from "../../../assets/icons/filter.svg?react";
import genreIconMap from "../../utilities/GenreIcons";

//platform icons
import PsIcon from "../../../assets/icons/platforms/ps.svg?react"
import XboxIcon from "../../../assets/icons/platforms/xbox.svg?react"
import PcIcon from "../../../assets/icons/platforms/pc-basic.svg?react"
import SwitchIcon from "../../../assets/icons/platforms/switch.svg?react"


interface SidebarData {
  colorScheme: string;
  title: string;
  subTitle: string;
  // onItemClick: () => void;
  // onGroupClick: () => void;
  group: {
    groupName: string;
    item: { itemName: string; icon: React.ReactNode }[];
  }[];
}

function Sidebar(colorScheme: string) {
  console.log(colorScheme);

  const sidebarData: SidebarData = {
    title: "Filters",
    subTitle: "Select one or more",
    colorScheme: colorScheme,
    group: [
      {
        groupName: "Genres",
        item: [
          {itemName: "action", icon: genreIconMap["action"]},
          {itemName: "indie", icon: genreIconMap["indie"]},
          {itemName: "adventure", icon: genreIconMap["adventure"]},
          {itemName: "role-playing-games-rpg", icon: genreIconMap["role-playing-games-rpg"]},
          {itemName: "strategy", icon: genreIconMap["strategy"]},
          {itemName: "shooter", icon: genreIconMap["shooter"]},
          {itemName: "casual", icon: genreIconMap["casual"]},
          {itemName: "simulation", icon: genreIconMap["simulation"]},
          {itemName: "puzzle", icon: genreIconMap["puzzle"]},
          {itemName: "arcade", icon: genreIconMap["arcade"]},
          {itemName: "platformer", icon: genreIconMap["platformer"]},
          {itemName: "massively-multiplayer", icon: genreIconMap["massively-multiplayer"]},
          {itemName: "racing", icon: genreIconMap["racing"]},
          {itemName: "sports", icon: genreIconMap["sports"]},
          {itemName: "fighting", icon: genreIconMap["fighting"]},
          {itemName: "family", icon: genreIconMap["family"]},
          {itemName: "board-games", icon: genreIconMap["board-games"]},
          {itemName: "card", icon: genreIconMap["card"]},
          {itemName: "educational", icon: genreIconMap["educational"]},
        ],
      },
      {
        groupName: "Platforms",
        item: [
          { itemName: "Playstations", icon: <PsIcon /> },
          { itemName: "Xbox Consoles", icon: <XboxIcon /> },
          { itemName: "Nintendo Switch", icon: <SwitchIcon /> },
          { itemName: "PC", icon: <PcIcon /> },
        ],
      },
      {/*
      {
        groupName: "Tags",
        item: [
          { itemName: "test item 1", icon: <TestIcon2 /> },
          { itemName: "test item 2", icon: <TestIcon3 /> },
        ],
      },
      {
        groupName: "Miscellaneous",
        item: [
          { itemName: "test item 3", icon: <TestIcon2 /> },
          { itemName: "test item 4", icon: <TestIcon3 /> },
        ],
      },
      {
        groupName: "Group One",
        item: [
          { itemName: "test item 1", icon: <TestIcon2 /> },
          { itemName: "test item 2", icon: <TestIcon3 /> },
        ],
      },
      {
        groupName: "Group Two",
        item: [
          { itemName: "test item 3", icon: <TestIcon2 /> },
          { itemName: "test item 4", icon: <TestIcon3 /> },
        ],
      },*/}
    ],
  };

  return (
    <>
      <div className="sidebar">       
        <div className="sidebar-title">
          <div className="sidebar-icon">
            <FilterIcon />
          </div>
          <div className="sidebar-title-text">
          <h2>{sidebarData.title}</h2>
          <h6>{sidebarData.subTitle}</h6>
          </div>
        </div>
        {sidebarData.group.map((group) => {
          return group.item ? (
            <SidebarGroup
              key={group.groupName}
              groupName={group.groupName}
              item={group.item}
              colorScheme={sidebarData.colorScheme}
            />
          ) : null;
        })}
      </div>
    </>
  );
}

export default Sidebar;
