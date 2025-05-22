
import PcIcon from "../../assets/icons/platforms/pc.svg?react";
import XboxIcon from "../../assets/icons/platforms/xbox.svg?react";
import PsIcon from "../../assets/icons/platforms/ps.svg?react";
import SwitchIcon from "../../assets/icons/platforms/switch.svg?react";
import Tooltip from "@mui/material/Tooltip";

interface PlatformIconsProps {
  platforms: string[];
}

const GetPlatformIcons: React.FC<PlatformIconsProps> = ({ platforms }: PlatformIconsProps) => {
  return (
    <>
      {/* TODO: Order icons consistently */}
      {platforms.map((platform, index) => {
          const normalized = platform.toLowerCase();

          if (["pc", "windows"].includes(normalized)) {
            return (
              <Tooltip key={index} title="Windows">
                <PcIcon key={index} className="platform-icon platform-pc" aria-label="PC" />
              </Tooltip>
            );
          }
          if (normalized.includes("xbox")) {
            return (
              <Tooltip key={index} title="Xbox">
                <XboxIcon key={index} className="platform-icon platform-xbox" aria-label="Xbox" />
              </Tooltip>
            );
          }
          if (["ps", "playstation"].includes(normalized)) {
            return (
              <Tooltip key={index} title="PlayStation">
                <PsIcon key={index} className="platform-icon platform-ps" aria-label="PS" />
              </Tooltip>
              );
          }
          if (["nintendo switch", "switch"].includes(normalized)) {
            return (
              <Tooltip key={index} title="Nintendo Switch">
                <SwitchIcon key={index} className="platform-icon platform-switch" aria-label="Switch" />
              </Tooltip>
            );
          }
          return null;
        })
        .filter(Boolean)}
    </>
  );
};



export default GetPlatformIcons;
