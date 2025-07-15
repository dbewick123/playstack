import PcIcon from "../../assets/icons/platforms/pc.svg?react";
import XboxIcon from "../../assets/icons/platforms/xbox.svg?react";
import PsIcon from "../../assets/icons/platforms/ps.svg?react";
import PsBasicIcon from "../../assets/icons/platforms/ps-basic.svg?react";
import SwitchIcon from "../../assets/icons/platforms/switch.svg?react";
import Tooltip from "@mui/material/Tooltip";

interface PlatformIconsProps {
  platforms: number[];
}

const GetPlatformIcons: React.FC<PlatformIconsProps> = ({platforms,}: PlatformIconsProps) => { 

  if(platforms?.length > 0) {

  const sortPlatformOrder = (actualPlatforms: number[]) => {
    const targetOrder = [187, 18, 7, 186, 4];
    const finalOrder: number[] = [];

    targetOrder.forEach((num) => {
      if (actualPlatforms.includes(num)) {
        finalOrder.push(num);

      }
    });
    return finalOrder;
  };

  const sortedPlatforms: number[] = sortPlatformOrder(platforms);
  
  return (
    <>
      {sortedPlatforms
        .map((platform, index) => {
          if (platform === 4) {
            return (
              <Tooltip key={index} title="Windows">
                <PcIcon
                  key={index}
                  className="platform-icon platform-pc"
                  aria-label="PC"
                />
              </Tooltip>
            );
          }
          if (platform === 186) {
            return (
              <Tooltip key={index} title="Xbox">
                <XboxIcon
                  key={index}
                  className="platform-icon platform-xbox"
                  aria-label="Xbox"
                />
              </Tooltip>
            );
          }
          if (platform === 187) {
            return (
              <Tooltip key={index} title="PlayStation 5">
                <PsBasicIcon
                  key={index}
                  className="platform-icon platform-ps"
                  aria-label="PS"
                />
              </Tooltip>
            );
          }
          if (platform === 18) {
            return (
              <Tooltip key={index} title="PlayStation 4">
                <PsIcon
                  key={index}
                  className="platform-icon platform-ps"
                  aria-label="PS"
                />
              </Tooltip>
            );
          }
          if (platform === 7) {
            return (
              <Tooltip key={index} title="Nintendo Switch">
                <SwitchIcon
                  key={index}
                  className="platform-icon platform-switch"
                  aria-label="Switch"
                />
              </Tooltip>
            );
          }
          return null;
        })
        .filter(Boolean)}
    </>
  );
  } else {
    return;
  }
};

export default GetPlatformIcons;
