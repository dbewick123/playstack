import PcIcon from "../../assets/icons/platforms/pc.svg?react";
import XboxIcon from "../../assets/icons/platforms/xbox.svg?react";
import PsIcon from "../../assets/icons/platforms/ps.svg?react";
import PsBasicIcon from "../../assets/icons/platforms/ps-basic.svg?react";
import SwitchIcon from "../../assets/icons/platforms/switch.svg?react";

type GenreInfo = {
  id: number;
  name: string;
  icon: React.ComponentType;
};

const platformIconMap: { [id: number]: GenreInfo } = {
  187: {
    id: 187,
    name: "Playstation 5",
    icon: PsBasicIcon,
  },
  18: {
    id: 18,
    name: "Playstation 4",
    icon: PsIcon,
  },
  7: {
    id: 7,
    name: "Nintendo Switch",
    icon: SwitchIcon,
  },
  186: {
    id: 186,
    name: "Xbox Series X/S",
    icon: XboxIcon,
  },
  4: {
    id: 4,
    name: "PC",
    icon: PcIcon,
  },
};

export default platformIconMap;
