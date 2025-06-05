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
    items: { id: number; name: string; icon: React.ReactNode }[];
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
          genreIconMap['4'],
          genreIconMap['51'],
          genreIconMap['3'],
          genreIconMap['5'],
          genreIconMap['10'],
          genreIconMap['2'],
          genreIconMap['40'],
          genreIconMap['14'],
          genreIconMap['7'],
          genreIconMap['11'],
          genreIconMap['83'],
          genreIconMap['59'],
          genreIconMap['1'],
          genreIconMap['15'],
          genreIconMap['6'],
          genreIconMap['19'],
          genreIconMap['28'],
          genreIconMap['17'],
          genreIconMap['34']

        ],
      },
      {
        groupName: "Platforms",
        groupId: 2,
        items: [
          { id: 187, name: "Playstation 5", icon: <PsBasicIcon /> },
          { id: 18, name: "Playstation 4", icon: <PsBasicIcon /> },
          { id: 186, name: "Xbox Series X/S", icon: <XboxIcon /> },
          { id: 7, name: "Nintendo Switch", icon: <SwitchIcon /> },
          { id: 4, name: "PC", icon: <PcIcon /> },
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
