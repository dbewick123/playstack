// Smart container for filter sidebar
import "./sidebar.css";

import SidebarGroup from "./SidebarGroup";
import FilterIcon from "../../../assets/icons/filter.svg?react";
import genreIconMap from "../../utilities/GenreIcons";
import platformIconMap from "../../utilities/PlatformIcons";
import { SvgIconProps, Tooltip } from "@mui/material";

//platform icons
import PsBasicIcon from "../../../assets/icons/platforms/ps-basic.svg?react";
import XboxIcon from "../../../assets/icons/platforms/xbox.svg?react";
import PcIcon from "../../../assets/icons/platforms/pc.svg?react";
import SwitchIcon from "../../../assets/icons/platforms/switch.svg?react";

import { useSelector, useDispatch } from "react-redux";
import { selectFilters, clearFilters } from "../../../store/slices/searchSlice";

interface SidebarData {
  title: string;
  subTitle: string;
  groups: {
    groupName: string;
    groupId: number;
    items: {
      id: number;
      name: string;
      icon: React.ComponentType<SvgIconProps>;
    }[];
  }[];
}

function Sidebar() {
  const dispatch = useDispatch();
  const handleClearClick = () => {
    dispatch(clearFilters())
  }

  const currentReduxFilters = useSelector(selectFilters);

  const currentPlatformFilters = currentReduxFilters?.platforms
    ?.map((platformItem) => {
      return platformItem != null
        ? platformIconMap[Number(platformItem)]?.name
        : null;
    })
    .filter(Boolean);

  const currentGenrefilters = currentReduxFilters?.genres
    ?.map((genreItem) => {
      return genreItem != null ? genreIconMap[Number(genreItem)]?.name : null;
    })
    .filter(Boolean);

  const getAllCurrentFilters = () => {
    if (!currentGenrefilters && !currentPlatformFilters) {
      return;
    }
    const combinedFilters = [
      ...(currentGenrefilters ?? []),
      ...(currentPlatformFilters ?? []),
    ];

    return combinedFilters.join(", ");
  };

  const allCurrentFilters = getAllCurrentFilters();

  const sidebarData: SidebarData = {
    title: "Filters",
    subTitle: "Click to add",
    groups: [
      {
        groupName: "Genres",
        groupId: 1,
        items: [
          genreIconMap["4"],
          genreIconMap["51"],
          genreIconMap["3"],
          genreIconMap["5"],
          genreIconMap["10"],
          genreIconMap["2"],
          genreIconMap["40"],
          genreIconMap["14"],
          genreIconMap["7"],
          genreIconMap["11"],
          genreIconMap["83"],
          genreIconMap["59"],
          genreIconMap["1"],
          genreIconMap["15"],
          genreIconMap["6"],
          genreIconMap["19"],
          genreIconMap["28"],
          genreIconMap["17"],
          genreIconMap["34"],
        ],
      },
      {
        groupName: "Platforms",
        groupId: 2,
        items: [
          { id: 187, name: "Playstation 5", icon: PsBasicIcon },
          { id: 18, name: "Playstation 4", icon: PsBasicIcon },
          { id: 186, name: "Xbox Series X/S", icon: XboxIcon },
          { id: 7, name: "Nintendo Switch", icon: SwitchIcon },
          { id: 4, name: "PC", icon: PcIcon },
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
        {!allCurrentFilters ? (
          <></>
        ) : (
          <div className="sidebar-active-filters-wrapper">
            <div className="sidebar-active-title">
              <h6>Active</h6>
            </div>
            <div className="sidebar-active-filters">
              <h6 className="clear-click-area link-hover" onClick={handleClearClick}>X</h6>
              <Tooltip title={allCurrentFilters}>
                <h6 className="sidebar-overflow">{allCurrentFilters}</h6>
              </Tooltip>
            </div>
          </div>
        )}

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
