// Smart container for filter sidebar
import "./sidebar.css";

import SidebarGroup from "./SidebarGroup";
import FilterIcon from "../../../assets/icons/filter.svg?react";
import genreIconMap from "../../utilities/GenreIcons";

//platform icons
import PsBasicIcon from "../../../assets/icons/platforms/ps-basic.svg?react";
import XboxIcon from "../../../assets/icons/platforms/xbox.svg?react";
import PcIcon from "../../../assets/icons/platforms/pc.svg?react";
import SwitchIcon from "../../../assets/icons/platforms/switch.svg?react";

interface SidebarData {
  title: string;
  subTitle: string;
  groups: {
    groupName: string;
    groupId: number;
    items: { id: number; itemName: string; icon: React.ReactNode }[];
  }[];
}

function Sidebar() {
  const sidebarData: SidebarData = {
    title: "Filters",
    subTitle: "Select one or more",
    groups: [
      {
        //TODO: Test will all platform IDs to check correct (could just call the /platform end point for this test?)
        groupName: "Genres",
        groupId: 1,
        items: [
          { id: 4, itemName: "action", icon: genreIconMap["action"] },
          { id: 51, itemName: "indie", icon: genreIconMap["indie"] },
          { id: 3, itemName: "adventure", icon: genreIconMap["adventure"] },
          {
            id: 5,
            itemName: "role-playing-games-rpg",
            icon: genreIconMap["role-playing-games-rpg"],
          },
          { id: 10, itemName: "strategy", icon: genreIconMap["strategy"] },
          { id: 2, itemName: "shooter", icon: genreIconMap["shooter"] },
          { id: 40, itemName: "casual", icon: genreIconMap["casual"] },
          { id: 14, itemName: "simulation", icon: genreIconMap["simulation"] },
          { id: 7, itemName: "puzzle", icon: genreIconMap["puzzle"] },
          { id: 11, itemName: "arcade", icon: genreIconMap["arcade"] },
          { id: 83, itemName: "platformer", icon: genreIconMap["platformer"] },
          {
            id: 59,
            itemName: "massively-multiplayer",
            icon: genreIconMap["massively-multiplayer"],
          },
          { id: 1, itemName: "racing", icon: genreIconMap["racing"] },
          { id: 15, itemName: "sports", icon: genreIconMap["sports"] },
          { id: 6, itemName: "fighting", icon: genreIconMap["fighting"] },
          { id: 19, itemName: "family", icon: genreIconMap["family"] },
          {
            id: 28,
            itemName: "board-games",
            icon: genreIconMap["board-games"],
          },
          { id: 17, itemName: "card", icon: genreIconMap["card"] },
          {
            id: 34,
            itemName: "educational",
            icon: genreIconMap["educational"],
          },
        ],
      },
      {
        groupName: "Platforms",
        groupId: 2,
        items: [
          { id: 187, itemName: "Playstation 5", icon: <PsBasicIcon /> },
          { id: 18, itemName: "Playstation 4", icon: <PsBasicIcon /> },
          { id: 186, itemName: "Xbox Series X/S", icon: <XboxIcon /> },
          { id: 7, itemName: "Nintendo Switch", icon: <SwitchIcon /> },
          { id: 4, itemName: "PC", icon: <PcIcon /> },
        ],
      },
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
        {sidebarData.groups.map((group) => {
          return group.items ? (
            <SidebarGroup
              key={group.groupName}
              groupName={group.groupName}
              groupId={group.groupId}
              items={group.items}
            />
          ) : null;
        })}
      </div>
    </>
  );
}

export default Sidebar;
